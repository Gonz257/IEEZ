import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  constructor(public authService: AuthService){

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
}