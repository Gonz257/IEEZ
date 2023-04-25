import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private URL = "https://ieezapi.onrender.com/api"
  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<any>(this.URL + '/tasks')
  }
  getPrivateTasks(){
    return this.http.get<any>(this.URL + '/private-tasks')
  }
  getUsers(){
    return this.http.get<any>(this.URL + '/users')
  }
  getOneUser(name: string){
    return this.http.get<any>(this.URL + '/users/' + name)
  }

}
