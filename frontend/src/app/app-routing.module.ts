import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components

import { TasksComponent } from './components/tasks/tasks.component'; 
import { PrivateTasksComponent} from './components/private-tasks/private-tasks.component';
import { SigninComponent } from './components/signin/signin.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path:'',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path:'private',
    component: PrivateTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
