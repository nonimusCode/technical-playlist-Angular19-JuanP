import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListaReproduccionService } from '../../../core/services/lista-reproduccion.service';
import { ListaReproduccion } from '../../../core/models/lista-reproduccion.model';

@Component({
  selector: 'app-lista-reproduccion-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-reproduccion-list.component.html',
  styleUrl: './lista-reproduccion-list.component.css',
})
export class ListaReproduccionListComponent implements OnInit {
  listas: ListaReproduccion[] = [];
  errorMessage: string | null = null;
  loading = true;

  constructor(
    private listaService: ListaReproduccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarListas();
  }

  cargarListas(): void {
    this.loading = true;
    this.listaService.getAllListas().subscribe({
      next: (listas) => {
        this.listas = listas;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las listas de reproducción';
        console.error('Error al obtener listas:', error);
        this.loading = false;
      },
    });
  }

  verDetalle(nombreLista: string): void {
    this.router.navigate(['/lists', nombreLista]);
  }

  eliminarLista(nombreLista: string, event: Event): void {
    event.stopPropagation();
    if (
      confirm(`¿Estás seguro de que deseas eliminar la lista "${nombreLista}"?`)
    ) {
      this.listaService.eliminarLista(nombreLista).subscribe({
        next: () => {
          this.listas = this.listas.filter(
            (lista) => lista.nombre !== nombreLista
          );
        },
        error: (error) => {
          this.errorMessage = `Error al eliminar la lista "${nombreLista}"`;
          console.error('Error al eliminar lista:', error);
        },
      });
    }
  }
}
