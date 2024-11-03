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
    loadChildren: () => import('./task/features/task.routes'),
  },
  {
    // Ruta para redireccionar al task  si no está autenticado
    path: '**',
    redirectTo: '/tasks',

  }
];
