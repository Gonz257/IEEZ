import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import {  Router} from "@angular/router";
import Swal from "sweetalert2";
//const bcrypt = require("bcrypt");
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cuenta = {
    user: '',
    password: '',
    firstTime: true
  }

  private URL = "http://localhost:9000/api"
   
  constructor(private http: HttpClient, private router: Router) { }

  firstTime( firstTime: boolean){
    if (firstTime == true){
      Swal.fire({
        title: 'Cambia tu contraseña',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Contraseña nueva">',
        focusConfirm: false,
        preConfirm: () => {
          const inputElement =document.getElementById('swal-input1') as HTMLInputElement;
          const pass = inputElement.value
          return  pass
        }
      }).then((value) => {
        //console.log(value?.value)
        this.cuenta.user = localStorage.getItem('usuario') || '';
        this.cuenta.password = value?.value || '';
        this.changePass(this.cuenta)
  
        
      })
    }
  }

  getUser(cuenta: { user: string;}){
    return  this.http.get<any>(this.URL +'/users/'+cuenta.user);
  }
  signIn(cuenta: { user: string; password: string;  }){
    return  this.http.get<any>(this.URL +'/signin/?user='+cuenta.user+'&password='+cuenta.password);
  }

  changePass(cuenta: { user:string; password: string; firstTime: boolean }){
      Swal.fire({
        title: 'DATOS',
        text: "Usuario: " + cuenta.user + " Pontraseña nueva: " + cuenta.password + " primeravez?: " + cuenta.firstTime,
      })
  }
 /* signIn(cuenta: { user: string; password: string;  }){
    bcrypt.hash(cuenta.password, 8 , (err,hash) =>{
      if(err) return err

    const pass = hash;
    }
    return this.http.get<any>(this.URL +'/signin/?user='+cuenta.user+'&password='+pass);
  }*/

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    //console.log(localStorage.getItem('token'), "Este soy yo, token desde getToken")
    return localStorage.getItem('token')
  }

  logOut(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token')
          localStorage.removeItem('usuario')
          this.router.navigate(['/signin'])
        Swal.fire({
          title: 'Sesión cerrada',
          text: "Hasta luego",
          icon: "success"
    })
        }
      });
    } 
  }

