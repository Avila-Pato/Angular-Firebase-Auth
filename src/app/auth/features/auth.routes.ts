import { Routes } from '@angular/router';

// ve las rutas para que esta se pinte cuando la busquemos por el link

export default  [
{
    path: "sign-in",
    loadComponent: () => import('./sign-in/sign-in.component')
},
{
    path: "sign-up",
    loadComponent: () => import('./sign-up/sign-up.component')
}
];
