import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface AuthResponse {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Comprobar el token al iniciar el servicio
    this.checkToken();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    // Para propósitos de prueba, simularemos una autenticación exitosa si:
    // username: admin, password: admin
    if (username === 'admin' && password === 'admin') {
      const mockResponse: AuthResponse = {
        token: 'mock-jwt-token',
        username: 'admin',
      };

      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('username', mockResponse.username);
      this.isAuthenticatedSubject.next(true);

      return of(mockResponse);
    }

    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error) => {
          this.isAuthenticatedSubject.next(false);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private checkToken(): void {
    const token = this.getToken();
    if (!token) {
      this.isAuthenticatedSubject.next(false);
      return;
    }

    // Aquí podrías verificar si el token es válido (no expirado)
    // usando la API real, pero por simplicidad solo verificamos
    // que exista por ahora
    this.isAuthenticatedSubject.next(true);

    // En una implementación real, podrías verificar con el backend:
    /*
    this.http.get(`${environment.apiUrl}/auth/validate-token`).subscribe({
      next: () => this.isAuthenticatedSubject.next(true),
      error: () => {
        this.logout();
        this.isAuthenticatedSubject.next(false);
      }
    });
    */
  }
}
