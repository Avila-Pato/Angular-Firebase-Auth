import { Component, output, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-google-button',
  standalone: true,
  imports: [],
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.css'
})
export class GoogleButtonComponent {

  // Añade un evento click al botón de Google

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
