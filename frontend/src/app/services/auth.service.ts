import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import {  Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:9000/api"
   
  constructor(private http: HttpClient, private router: Router) { }

  signUp(cuenta: { user: string; password: string; }){
    return this.http.post<any>(this.URL+ '/registro', cuenta);

  }

  signIn(cuenta: { user: string; password: string; }){
    return  this.http.post<any>(this.URL +'/signin', cuenta);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    //console.log(localStorage.getItem('token'), "Este soy yo, token desde getToken")
    return localStorage.getItem('token')
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }
}
