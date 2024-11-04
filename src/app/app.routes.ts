import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    //  protegiendo rutas
    canActivate: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
    //  protegiendo rutas
    canActivate: [privateGuard()],
    // Nombre de la ruta al buscar 
    path: 'tasks',
    // de esta forma se asegura que se cargue de forma perezosa 
    //y que no se carguen todos los recursos a la vez
    
    loadComponent: () => import('./shared/ui/layout.components'),
    loadChildren: () => import('./task/features/task.routes'),
  },
  {
    // Ruta para redireccionar al task  si no está autenticado
    path: '**',
    redirectTo: '/tasks',

  }
];
