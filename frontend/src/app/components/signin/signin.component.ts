import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import Swal from "sweetalert2";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']

})
export class SigninComponent  implements OnInit{
  cuenta = {
    user: '',
    password: ''
  }
   
  constructor(
    public authService: AuthService,
    public router: Router
  ){}

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.router.navigate(["/private"])
    }
    
  }

  signin(){
    this.authService.signIn(this.cuenta)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        localStorage.setItem("usuario", this.cuenta.user)
        this.router.navigate(["/private"]);
        Swal.fire({
          title: 'Bienvenido ' + this.cuenta.user ,
          text: "Inicio de sesión exitoso",
          icon: "success"
        })

      },
        err => {
          console.log(err);
          if (err.status==401){
            Swal.fire({
              title: 'Error',
              text: "Usuario y/o contraseña incorrectos",
              icon: "error"
            })
          }else{
            Swal.fire({
              title: 'Error',
              text: "Error desconocido, contacte al técnico",
              icon: "error"
            })
          }
            
      }

    )
  }

  mensaje(estado: string){
    
  }

  /*myFunction(){
    var x = document.getElementById("myInput");
  if (x?.nodeType == ) {
    x.type = "text";
  } else {
    x.type = "password";
  }
  }*/
}
