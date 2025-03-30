import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ListaReproduccionListComponent } from './features/playlists/lista-reproduccion-list/lista-reproduccion-list.component';
import { ListaReproduccionDetailComponent } from './features/playlists/lista-reproduccion-detail/lista-reproduccion-detail.component';
import { ListaReproduccionFormComponent } from './features/playlists/lista-reproduccion-form/lista-reproduccion-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lists', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'lists', component: ListaReproduccionListComponent },
      { path: 'lists/new', component: ListaReproduccionFormComponent },
      { path: 'lists/:name', component: ListaReproduccionDetailComponent },
      { path: 'lists/:name/edit', component: ListaReproduccionFormComponent },
    ],
  },
  { path: '**', redirectTo: 'lists' },
];
