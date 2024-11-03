import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { isRequired } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export default class SignInComponent {
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
   form = this._formBuilder.group<FormSignIn>({
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
       await this._authService.signIn({ email, password });
       //Notificacion 
       toast.success('Bienvenido')
       // si todo va correctamente rediriga a als tareas
       this._router.navigateByUrl('/tasks');
 
     } catch (error) {
       toast.error('Ocurrio un error.')
     }
   }
   async submitWithGoogle(){
    try {
      await this._authService.signInWithGoogle()
      toast.success('Bienvenido de nuevo')
      // si todo va correctamente rediriga a als tareas
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ocurrio un error.')
    }
  }

}
