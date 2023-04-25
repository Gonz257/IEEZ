import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from '../../services/tasks.service'
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit{



  cuenta = {
    _id: '',
    user: '',
    password: '',
    firstTime: true
  }
  
  v = ''
  p=''

  constructor( private taskService: TasksService, public authService: AuthService, public router: Router){}

  ngOnInit() {
    //console.log ("XD wasa" + this.cuenta.user)
    this.v = localStorage.getItem("usuario") || ''
    this.taskService.getOneUser( this.v)
      .subscribe(
        res => {
          this.cuenta = res
          localStorage.setItem("permiso",res.isAdmin)
          //console.log("Valor en res: " + this.cuenta._id + " " + this.cuenta.user + " " + this.cuenta.password+ " "  + this.cuenta.firstTime)
          this.authService.firstTime(this.cuenta)
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )


    //this.authService.firstTime(this.cuenta.firstTime)
    
  }

  nav(ruta: string){
    this.router.navigate([ruta]);
  }
  getPermit(){
    var permiso = localStorage.getItem("permiso")
    if (permiso == "true"){
        return true
    } else
      return false
  }

}
