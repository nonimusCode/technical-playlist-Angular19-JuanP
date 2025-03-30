import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ListaReproduccionListComponent } from './features/playlists/lista-reproduccion-list/lista-reproduccion-list.component';
import { ListaReproduccionDetailComponent } from './features/playlists/lista-reproduccion-detail/lista-reproduccion-detail.component';
import { ListaReproduccionFormComponent } from './features/playlists/lista-reproduccion-form/lista-reproduccion-form.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lists', pathMatch: 'full' },
      {
        path: 'lists',
        component: ListaReproduccionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'lists/new',
        component: ListaReproduccionFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'lists/:name',
        component: ListaReproduccionDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'lists' },
];
