import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Credenciales Basic Auth (usuario: admin, contraseña: admin)
    const credentials = btoa('admin:admin');

    // Clonar la solicitud y añadir el header de autorización
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Basic ${credentials}`),
    });

    // Pasar la solicitud modificada al siguiente manejador
    return next.handle(authReq);
  }
}
