import { Component, Input, input } from '@angular/core';
import { Task } from '../../data-access/task.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {

  
  @Input() tasks: Task[] = []; // Inicial con un arreglo vacio


  trackById(index: number, task: Task): string {
    return task.id;
  }

}
