import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { RegistroCedulaComponent } from "./components/registro-cedula/registro-cedula.component";
import { PrivateTasksComponent} from './components/private-tasks/private-tasks.component';
import { SigninComponent } from './components/signin/signin.component';

import { AuthGuard } from "./auth.guard";
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ListaUsersComponent } from './components/lista-users/lista-users.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegistroCedulaComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'private',
    component: PrivateTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent,

  },
  {
    path: 'buscar',
    component: BuscadorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lista',
    component: ListaUsersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
