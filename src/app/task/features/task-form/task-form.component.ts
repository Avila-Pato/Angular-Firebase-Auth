import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export default class TaskFormComponent {
   // Inyecta los servicios para crear formularios de manera reactiva
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject (TaskService)
  private _router = inject(Router)

  loading = signal(false)

     // Define el formulario reactivo usando FormBuilder
  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),

  })
  // evaluar si el formulario es valido..
 async submit(){
    if(this.form.invalid) return;
    try{
      this.loading.set(true)
      const {title, completed} = this.form.value;
       const task: TaskCreate = {
        title: title || '',
        completed: !!completed
       }
       await this._taskService.create(task)

       toast.success('Tarea creada correctamente')
       this._router.navigateByUrl('/tasks') // si la tarea fue completada dirige aqui
    }catch(error){
      toast.success('Ocurrio un problema')
    } finally {
      this.loading.set(false)
    }
  }

}
