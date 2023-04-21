import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import {  Router} from "@angular/router";
import Swal from "sweetalert2";
import bcrypt from "bcrypt"

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private URL = "http://localhost:9000/api"
   
  constructor(private http: HttpClient, private router: Router) { }

  firstTime( cuenta: {_id:String; user:String; password: String; firstTime: Boolean }){
    if (cuenta.firstTime == true){
      Swal.fire({
        title: 'Cambia tu contraseña',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Contraseña nueva">',
        focusConfirm: false,
        preConfirm: () => {
          const inputElement =document.getElementById('swal-input1') as HTMLInputElement;
          const pass = inputElement.value
          return  pass
        },
        icon: "warning"
      }).then((value) => {
        console.log(value?.value)
        cuenta.password = value?.value || '';
        cuenta.firstTime = false;
        console.log("Valor en SWAL: " + cuenta._id + " " + cuenta.user + " " + cuenta.password+ " "  + cuenta.firstTime)
        this.changePass(cuenta)
  
        
      })
    }
  }


  getUser(cuenta: { user: string;}){
    return  this.http.get<any>(this.URL +'/users/'+cuenta.user);
  }
  signIn(cuenta: { user: string; password: string;  }){
    return  this.http.get<any>(this.URL +'/signin/?user='+cuenta.user+'&password='+cuenta.password);
  }

  changePass(cuenta: { _id:String; user:String; password: String; firstTime: Boolean }){
      const body = {password: cuenta.password, firstTime: cuenta.firstTime}
      console.log(body, cuenta._id);
      this.http.put(this.URL +'/users/'+cuenta._id, body).subscribe(
        (response) => {
          Swal.fire({
            title: 'Contraseña actualizada',
            text: "Contraseña nueva: " + cuenta.password,
            icon: "success"
          })
          // Aquí puedes hacer algo con la respuesta del servidor
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: "Ha sucedido un error, intentelo más tarde",
            icon: "error"
          })
          // Aquí puedes manejar el error de la petición
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

