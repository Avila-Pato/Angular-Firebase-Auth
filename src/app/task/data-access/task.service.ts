import { inject, Injectable, signal } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  loading = signal<boolean>(true)

  getTasks(): Observable<Task[]> {  // Cambiar a método que devuelve un Observable tambien esta asignado un loading de carga
    return (collectionData(this._collection, {idField: 'id'}) as Observable<Task[]>).pipe(
      tap(() => {
        this.loading.set(false)
      }),
      // en caso de errores 
      catchError((error) => {
        this.loading.set(false)
        return throwError(() => error)
      })
    )
   // Devolver observable directamente
  }

  create(task: TaskCreate) {
    return addDoc(this._collection, task);
  }
}
