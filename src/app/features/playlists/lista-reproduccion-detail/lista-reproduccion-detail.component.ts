import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaReproduccionService } from '../../../core/services/lista-reproduccion.service';
import { ListaReproduccion } from '../../../core/models/lista-reproduccion.model';

@Component({
  selector: 'app-lista-reproduccion-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-reproduccion-detail.component.html',
  styleUrl: './lista-reproduccion-detail.component.css',
})
export class ListaReproduccionDetailComponent implements OnInit {
  lista: ListaReproduccion | null = null;
  errorMessage: string | null = null;
  loading = true;
  nombreLista: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listaService: ListaReproduccionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['name']) {
        this.nombreLista = params['name'];
        this.cargarLista(this.nombreLista);
      }
    });
  }

  cargarLista(nombre: string): void {
    this.loading = true;
    this.listaService.getLista(nombre).subscribe({
      next: (lista) => {
        this.lista = lista;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = `Error al cargar la lista de reproducción "${nombre}"`;
        console.error('Error al obtener lista:', error);
        this.loading = false;
      },
    });
  }

  editarLista(): void {
    this.router.navigate(['/lists', this.nombreLista, 'edit']);
  }

  eliminarLista(): void {
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar la lista "${this.nombreLista}"?`
      )
    ) {
      this.listaService.eliminarLista(this.nombreLista).subscribe({
        next: () => {
          this.router.navigate(['/lists']);
        },
        error: (error) => {
          this.errorMessage = `Error al eliminar la lista "${this.nombreLista}"`;
          console.error('Error al eliminar lista:', error);
        },
      });
    }
  }

  volver(): void {
    this.router.navigate(['/lists']);
  }
}
