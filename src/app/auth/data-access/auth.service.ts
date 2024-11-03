import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, // logea a traves de proveedores como google
  GoogleAuthProvider
} from '@angular/fire/auth';

// Creando authentificacion para que el usuario se registre

export interface User {
  email?: string; // Change String to string
  password: string; // Change String to string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  signUp(user: User) {
    if (user.email && user.password) {
      // Ensure email and password are defined
      return createUserWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );
    }
    throw new Error('Email and password are required');
  }
  signIn(user: User) {
    if (user.email && user.password) {
      // Ensure email and password are defined
      return signInWithEmailAndPassword(this._auth, user.email, user.password);
    }
    throw new Error('Email and password are required');
  }

    // Loica para la auth de google
  signInWithGoogle(){
    const provider = new GoogleAuthProvider()

    //Si hay problemas con el inicio de sesion y loguea sin seleccionar una cuenta desmarcar la linea
    // provider.setCustomParameters({ prompt: 'select_account '})

    return signInWithPopup(this._auth, provider)
  }
}
