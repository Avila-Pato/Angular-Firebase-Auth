import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
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
