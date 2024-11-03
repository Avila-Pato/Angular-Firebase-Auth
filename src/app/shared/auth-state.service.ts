import { inject, Injectable } from "@angular/core";
import { Auth, authState, signOut } from "@angular/fire/auth";
import { Observable } from "rxjs";

// este componente se encargara del estado de la autentifiacion globalmente
//Este servicio permite que los componentes observen el estado de autenticación de Firebase
// en tiempo real. authState$ emite información del usuario autenticado si está logueado,
// o null si no lo está, permitiendo tomar acciones en función de este estado.
@Injectable({
    providedIn: 'root'
})

export class AuthStateService {
    private _auth = inject(Auth)


    get authState$(): Observable<any>{
        return authState(this._auth)
    }

    logOut() {
        return signOut(this._auth)
    }
}