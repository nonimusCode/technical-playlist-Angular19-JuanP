import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaReproduccionService } from '../../../core/services/lista-reproduccion.service';
import { ListaReproduccion, Cancion } from '../../../core/models';

@Component({
  selector: 'app-lista-reproduccion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-reproduccion-form.component.html',
  styleUrl: './lista-reproduccion-form.component.css',
})
export class ListaReproduccionFormComponent implements OnInit {
  listaForm: FormGroup;
  editMode = false;
  nombreLista = '';
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private listaService: ListaReproduccionService
  ) {
    this.listaForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['name']) {
        this.editMode = true;
        this.nombreLista = params['name'];
        this.cargarLista(this.nombreLista);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      canciones: this.fb.array([]),
    });
  }

  get canciones(): FormArray {
    return this.listaForm.get('canciones') as FormArray;
  }

  createCancionForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required]],
      artista: ['', [Validators.required]],
      album: ['', [Validators.required]],
      anno: ['', [Validators.required]],
      genero: ['', [Validators.required]],
    });
  }

  addCancion(): void {
    this.canciones.push(this.createCancionForm());
  }

  removeCancion(index: number): void {
    this.canciones.removeAt(index);
  }

  cargarLista(nombre: string): void {
    this.loading = true;
    this.listaService.getLista(nombre).subscribe({
      next: (lista) => {
        this.listaForm.patchValue({
          nombre: lista.nombre,
          descripcion: lista.descripcion,
        });

        // Limpiar el FormArray primero
        while (this.canciones.length) {
          this.canciones.removeAt(0);
        }

        // Agregar cada canción al FormArray
        if (lista.canciones && lista.canciones.length > 0) {
          lista.canciones.forEach((cancion) => {
            this.canciones.push(
              this.fb.group({
                titulo: [cancion.titulo, [Validators.required]],
                artista: [cancion.artista, [Validators.required]],
                album: [cancion.album, [Validators.required]],
                anno: [cancion.anno, [Validators.required]],
                genero: [cancion.genero, [Validators.required]],
              })
            );
          });
        }

        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = `Error al cargar la lista "${nombre}"`;
        console.error('Error al obtener lista:', error);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.listaForm.valid) {
      const listaData: ListaReproduccion = this.listaForm.value;

      if (this.editMode) {
        // En modo edición, el nombre de la lista no se puede cambiar
        listaData.nombre = this.nombreLista;

        this.listaService.eliminarLista(this.nombreLista).subscribe({
          next: () => {
            this.listaService.crearLista(listaData).subscribe({
              next: () => {
                this.successMessage = 'Lista actualizada correctamente';
                setTimeout(() => {
                  this.router.navigate(['/lists', listaData.nombre]);
                }, 1500);
              },
              error: (error) => {
                this.errorMessage = 'Error al actualizar la lista';
                console.error('Error al actualizar lista:', error);
              },
            });
          },
          error: (error) => {
            this.errorMessage = 'Error al actualizar la lista';
            console.error('Error al eliminar lista para actualizar:', error);
          },
        });
      } else {
        // En modo creación
        this.listaService.crearLista(listaData).subscribe({
          next: () => {
            this.successMessage = 'Lista creada correctamente';
            setTimeout(() => {
              this.router.navigate(['/lists', listaData.nombre]);
            }, 1500);
          },
          error: (error) => {
            this.errorMessage = 'Error al crear la lista';
            console.error('Error al crear lista:', error);
          },
        });
      }
    }
  }

  volver(): void {
    if (this.editMode) {
      this.router.navigate(['/lists', this.nombreLista]);
    } else {
      this.router.navigate(['/lists']);
    }
  }
}
