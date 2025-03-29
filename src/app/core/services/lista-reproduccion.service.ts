import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaReproduccion } from '../models/lista-reproduccion.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListaReproduccionService {
  private apiUrl = `${environment.apiUrl}/lists`;

  constructor(private http: HttpClient) {}

  // Obtener todas las listas de reproducción
  getAllListas(): Observable<ListaReproduccion[]> {
    return this.http.get<ListaReproduccion[]>(this.apiUrl);
  }

  // Obtener una lista de reproducción por nombre
  getLista(nombreLista: string): Observable<ListaReproduccion> {
    return this.http.get<ListaReproduccion>(`${this.apiUrl}/${nombreLista}`);
  }

  // Crear una nueva lista de reproducción
  crearLista(lista: ListaReproduccion): Observable<ListaReproduccion> {
    return this.http.post<ListaReproduccion>(this.apiUrl, lista);
  }

  // Eliminar una lista de reproducción
  eliminarLista(nombreLista: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nombreLista}`);
  }
}
