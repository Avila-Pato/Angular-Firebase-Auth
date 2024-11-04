import { Component, inject } from '@angular/core'
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthStateService } from '../auth-state.service';

// Desde aqui se peude crear un narvar o un sidebar o botones etc de esta manera se renderiza
// como rutas privadas en una sola ruta osea no se renderiza en todas las rutas..
@Component({
    standalone: true,
    imports: [RouterModule, RouterLink],
    selector: 'app-layout',
    template: `

<header class="h-20 bg-gray-800 text-white shadow-md">
  <div class="container max-w-screen-lg mx-auto px-4 h-full flex items-center justify-between">
    <!-- Logo o Nombre -->
    <a class="text-3xl font-semibold tracking-wide hover:text-green-400" routerLink="/tasks">Ng Task</a>

    <!-- Botón de Salir -->
    <button 
      type="button"
      (click)="logOut()"
      class="focus:outline-none bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-white text-sm px-6 py-2 transition-colors duration-300 ease-in-out dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
    >
      Salir
    </button>
  </div>
</header>



    <router-outlet />
    ` ,
})
export default class LayoutComponent {
 // title = 'AngularAuthCrud';

 private _authState = inject(AuthStateService)
 private _router = inject(Router)
onClick: any;

 async logOut( ){
   await this._authState.logOut()
   this._router.navigateByUrl('/auth/sign-in')

 }
}