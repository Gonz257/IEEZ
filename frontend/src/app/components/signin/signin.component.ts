import { Component } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']

})
export class SigninComponent {
  cuenta = {
    user: '',
    password: ''
  }
   
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  signin(){
    this.authService.signIn(this.cuenta)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigate(["/private"]);
        alert("Inicio de sesión exitoso");

      },
        err => {
          console.log(err);
          if (err.status==401){
            alert("Usuarion no encontrado");
          }else if (err.status==402){
            alert("Contraseña incorrecta" );
          }else{
            alert("Error desconocido" );
          }
            
      }

    )
  }
}
