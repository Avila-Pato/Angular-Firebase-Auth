import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authState } from '@angular/fire/auth';
import { AuthStateService } from '../shared/auth-state.service';
import { map } from 'rxjs';

//es una función que decide si se puede acceder a una ruta específica o no.
// Se utiliza para proteger rutas en una aplicación, dependiendo de si el usuario cumple
// ciertas condiciones
export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {
        if (!state) {
          router.navigateByUrl('/auth/sign-in');  // Redirige si no está autenticado
          return false;
        }
        return true; // Permite el acceso si está autenticado
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {
        if (state) {
          router.navigateByUrl('/tasks');  // Redirige a la página principal si está autenticado
          return false; // No deberia volver a las rutas publicas si esta autentificado
        }
        return true; // Permite el acceso si no está autenticado
      })
    );
  };
};
