import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

// Interfaz para definir la estructura del formulario de registro
interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up', // Selector del componente para usar en HTML
  standalone: true, // Indica que el componente es independiente
  imports: [ReactiveFormsModule, CommonModule, RouterLink, GoogleButtonComponent], // Importa el módulo de formularios reactivos
  templateUrl: './sign-up.component.html', // Archivo de plantilla HTML del componente
})
export default class SignUpComponent {
  // Inyecta el servicio FormBuilder para crear formularios de manera reactiva
  private _formBuilder = inject(FormBuilder);
  // inyectando servicios de data-acces
  private _authService = inject(AuthService);
  // Redidirigiendo al usuario 
  private _router = inject(Router);

  //Metodo que verifica si el campo cuenta con los campos requeridos isRequired son de los validators
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError(): boolean {
    const emailControl = this.form.get('email');
    return (emailControl?.invalid && emailControl?.touched) || false;
  }
  hasPasswordError(): boolean {
    const passwordControl = this.form.get('password');
    return (passwordControl?.invalid && passwordControl?.touched) || false;
  }

  // Define el formulario reactivo usando FormBuilder
  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]), // Campo de email requerido
    password: this._formBuilder.control('', Validators.required), // Campo de contraseña requerido
  });
  // Método para enviar el formulario de registro
  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      // Realiza la acción de enviar el formulario de registro
      // Aquí puede conectarse con la base de datos y enviar el email y contraseña
      console.log({ email, password });
      await this._authService.signUp({ email, password });
      //Notificacion 
      toast.success('Usuario creado correctamente.')
      // si todo va correctamente rediriga a als tareas
      this._router.navigateByUrl('/tasks');

    } catch (error) {
      toast.error('Ocurrio un error.')
    }
  }

  async submitWithGoogle(){
    try {
      await this._authService.signInWithGoogle()
      toast.success('Bienvenido')
      // si todo va correctamente rediriga a als tareas
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ocurrio un error.')
    }
  }
}
