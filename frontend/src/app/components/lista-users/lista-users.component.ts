import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service'
import { AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.css']
})

export class ListaUsersComponent implements OnInit {

  usuarios: {user: string, isAdmin: boolean, district?: string}[] = [];
  usuariosFiltrados: {user: string, isAdmin: boolean, district?: string}[] = []
  busqueda=""

  constructor(private taskService: TasksService, private router: Router,    public authService: AuthService,) { }

  ngOnInit() {
    this.taskService.getUsers()
      .subscribe(
        res => {this.usuarios = res
            this.usuariosFiltrados=res
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
      this.usuariosFiltrados=this.usuarios
  }
  openNav() {
    const myElement = document.getElementById("sideNavigation")!
    const myElement1 = document.getElementById("main")!
    myElement.style.width = "250px";
    myElement1.style.marginLeft = "250px";
}
closeNav() {
  const myElement = document.getElementById("sideNavigation")!
  const myElement1 = document.getElementById("main")!
    myElement.style.width  = "0";
    myElement1.style.marginLeft = "0";
}

logOff(){
    this.authService.logOut();
  }

  
  filtrarUsuarios() {
    if (this.busqueda) {
      this.usuariosFiltrados = this.usuarios.filter
      (res => res.user.toLowerCase().includes(this.busqueda.toLowerCase()));
    } else {
      this.usuariosFiltrados = this.usuarios;
    }
  }
  getPermit(){
    var permiso = localStorage.getItem("permiso")
    if (permiso == "true"){
        return true
    } else
      return false
  }
}
