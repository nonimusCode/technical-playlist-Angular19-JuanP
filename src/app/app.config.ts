import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export function authInterceptor(req: any, next: any) {
  // Credenciales Basic Auth (usuario: admin, contraseña: admin)
  const credentials = btoa('admin:admin');

  // Clonar la solicitud y añadir el header de autorización
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Basic ${credentials}`),
  });

  return next(authReq);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
  ],
};
