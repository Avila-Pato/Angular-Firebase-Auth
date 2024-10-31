import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angularauth-d1df5',
        appId: '1:521156577741:web:9228e3a80a0258d2f9dc84',
        storageBucket: 'angularauth-d1df5.firebasestorage.app',
        apiKey: 'AIzaSyDkMFZ-UE4fSUaQRaqfM6mzSibQLWb3YZo',
        authDomain: 'angularauth-d1df5.firebaseapp.com',
        messagingSenderId: '521156577741',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angularauth-d1df5',
        appId: '1:521156577741:web:9228e3a80a0258d2f9dc84',
        storageBucket: 'angularauth-d1df5.firebasestorage.app',
        apiKey: 'AIzaSyDkMFZ-UE4fSUaQRaqfM6mzSibQLWb3YZo',
        authDomain: 'angularauth-d1df5.firebaseapp.com',
        messagingSenderId: '521156577741',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
