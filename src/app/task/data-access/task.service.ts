import { inject, Injectable, signal } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
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
  update(task: TaskCreate) {
    throw new Error('Method not implemented.');
  }
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  loading = signal<boolean>(true);

  // Método para obtener todas las tareas
  getTasks(): Observable<Task[]> {
    this.loading.set(true); // Establecer carga en true al inicio
    return (collectionData(this._collection, { idField: 'id' }) as Observable<Task[]>).pipe(
      tap(() => {
        this.loading.set(false); // Establecer carga en false al obtener tareas
      }),
      catchError((error) => {
        this.loading.set(false); // Establecer carga en false en caso de error
        return throwError(() => error);
      })
    );
  }
  

  // Método para obtener una tarea  actualizada específica por su id
  getTask(id: string): Observable<Task | undefined> {
    const docRef = doc(this._collection, id);
    return new Observable<Task | undefined>((observer) => {
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            observer.next({ id: docSnap.id, ...docSnap.data() } as Task);
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
  

  // Método para crear una nueva tarea
  create(task: TaskCreate) {
    return addDoc(this._collection, task);
  }

  updateTask(id: string, task: Partial<TaskCreate>) {
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, task);
  }
  deleteTask(id: string) {
    const docRef = doc(this._collection, id);
    return deleteDoc(docRef);
  }
}
