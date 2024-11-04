import { Routes } from '@angular/router';

// ve las rutas para que esta se pinte cuando la busquemos por el link
export default  [
{
    path: "",
    loadComponent: () => import('./task-list/task-list.component')
},
{
  path: 'new',
  loadComponent: () => import('./task-form/task-form.component')
},
{
    path: 'edit/:id',
    loadComponent: () => import('./task-form/task-form.component')
  }

] as Routes
