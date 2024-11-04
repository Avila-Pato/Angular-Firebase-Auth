import { Component, inject, OnInit} from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { RouterLink } from '@angular/router';
import { Task, TaskService } from '../../data-access/task.service';
import { BehaviorSubject, catchError, finalize, Observable, of, startWith, tap } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TableComponent, RouterLink, CommonModule],
  templateUrl: './task-list.component.html',
  styles: ``,
})
export default class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined;
  loading$: Observable<boolean>;

  constructor(private taskService: TaskService) {
    // Inicializa loading$ a true antes de la carga
    this.loading$ = of(true);
  }

  ngOnInit() {
    // Cambia loading$ a true y luego asigna las tareas
    this.loading$ = of(true);
    this.tasks$ = this.taskService.getTasks().pipe(
      startWith([]), // Permite que loading$ se mantenga como verdadero mientras carga
      catchError((error) => {
        console.error('Error al cargar tareas:', error);
        return of([]); // Maneja el error devolviendo un array vacío
      }),
      tap(() => {
        // Establece loading$ a false después de que se cargan las tareas
        this.loading$ = of(false);
      })
    );
  }
}