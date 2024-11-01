import { FormGroup } from '@angular/forms'

// Authtentificacion de correo y usuario
export const isRequired = (field: 'email' | 'password', form: FormGroup ) => {
const control = form.get(field);
return control && control.touched && control.hasError('required');

}

// Authtentificacion de correo 
export const hasEmailError = (form: FormGroup ) => {
    const control = form.get('email');
    return control && control.touched && control.hasError('required');
}

// Authtentificacion de password

export const hasPasswordError = (form: FormGroup ) => {
    const control = form.get('password');
    return control && control.touched && control.hasError('required');
}