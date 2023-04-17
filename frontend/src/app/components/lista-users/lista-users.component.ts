import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service'
@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.css']
})

export class ListaUsersComponent implements OnInit {

  usuarios = [];
  constructor(private taskService: TasksService, private router: Router) { }

  ngOnInit() {
    this.taskService.getUsers()
      .subscribe(
        res => this.usuarios = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
  }
}
