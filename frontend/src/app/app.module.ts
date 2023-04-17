import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';

import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { BuscadorComponent } from './components/buscador/buscador.component';
import { RegistroCedulaComponent } from './components/registro-cedula/registro-cedula.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListaUsersComponent } from './components/lista-users/lista-users.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    PrivateTasksComponent,
    BuscadorComponent,
    RegistroCedulaComponent,
    UsuariosComponent,
    ListaUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [AuthGuard,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
