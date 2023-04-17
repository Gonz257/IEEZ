import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from "../../services/tasks.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';
@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit{



  cuenta = {
    user: '',
  }
  

  constructor( public authService: AuthService, public router: Router){}

  ngOnInit() {
    /*this.cuenta.user  = localStorage.getItem("usuario") || ''
    //console.log ("XD wasa" + this.cuenta.user)
    console.log(this.authService.getUser(this.cuenta))
    this.authService.firstTime(true)
    */
  }

  nav(ruta: string){
    this.router.navigate([ruta]);
  }
}
