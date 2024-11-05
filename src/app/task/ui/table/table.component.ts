import { Component, Input } from '@angular/core';
import { Task } from '../../data-access/task.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent {
  @Input() tasks: Task[] = [];
  @Input() deleteTask!: (taskId: string) => void;
}