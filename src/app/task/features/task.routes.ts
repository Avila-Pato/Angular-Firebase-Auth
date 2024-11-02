import { Routes } from '@angular/router';

// ve las rutas para que esta se pinte cuando la busquemos por el link
export default  [
{
    path: "",
    loadComponent: () => import('./task-list/task-list.component')
},

];
