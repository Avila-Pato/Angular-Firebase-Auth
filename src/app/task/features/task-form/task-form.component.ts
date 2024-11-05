import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, switchMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute); // Inyecta ActivatedRoute

  loading = signal(false);

  private _idTask = new BehaviorSubject<string>(''); // ID de la tarea
  idTask$ = this._idTask.asObservable(); // Observable para el ID de la tarea

  task$: Observable<Task | undefined> = this.idTask$.pipe(
    switchMap(id => {
      if (id) {
        return this._taskService.getTask(id); // Obtiene la tarea si hay ID
      }
      return of(undefined); // Retorna undefined si no hay ID
    })
  );

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });

  constructor() {}

  ngOnInit() {
    // Extraemos el parámetro idTask de la URL
    this._route.paramMap.subscribe(params => {
      const id = params.get('idTask'); // Obtén el idTask de la URL
      if (id) {
        this._idTask.next(id); // Asigna el ID a _idTask
      }
    });

    // Suscripción a task$ para actualizar el formulario con los datos de la tarea
    this.task$.subscribe(task => {
      if (task) {
        this.form.patchValue(task); // Si la tarea existe, llena el formulario
      }
    });
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      this.loading.set(true);
      const { title, completed } = this.form.value;
      const task: TaskCreate = {
        title: title || '',
        completed: !!completed
      };

      const id = this._idTask.getValue(); // Obtiene el ID de _idTask

      if (id) {
        await this._taskService.updateTask(id, task); // Si existe el ID, actualiza la tarea
      } else {
        await this._taskService.create(task); // Si no hay ID, crea una nueva tarea
      }

      toast.success(`Tarea ${id ? 'actualizada' : 'creada'} correctamente`);
      this._router.navigateByUrl('/tasks'); // Redirige después de la acción
    } catch (error) {
      toast.error('Ocurrió un problema');
    } finally {
      this.loading.set(false);
    }
  }

  deleteTask(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this._taskService.deleteTask(id).then(() => {
        toast.success('Tarea eliminada correctamente');
        this._router.navigateByUrl('/tasks');
      }).catch((error) => {
        toast.error('Error al eliminar la tarea');
        console.error('Error al eliminar la tarea:', error);
      });
    }
  }
}