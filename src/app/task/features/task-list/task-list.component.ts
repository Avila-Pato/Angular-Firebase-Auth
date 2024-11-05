import { Component, inject, OnInit } from '@angular/core';
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
    this.loading$ = of(true);
  }

  ngOnInit() {
    this.loading$ = of(true);
    this.tasks$ = this.taskService.getTasks().pipe(
      startWith([]),
      catchError((error) => {
        console.error('Error al cargar tareas:', error);
        return of([]);
      }),
      tap(() => {
        this.loading$ = of(false);
      })
    );
  }

  // Función para eliminar una tarea
  deleteTask = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).then(() => {
        alert('Tarea eliminada con éxito');
        // Refresca la lista de tareas
        this.ngOnInit();
      }).catch(error => {
        console.error('Error eliminando la tarea:', error);
      });
    }
  }
  
}
