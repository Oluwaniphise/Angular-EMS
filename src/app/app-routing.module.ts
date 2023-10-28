import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { AddTaskComponent } from './components/dashboard/admin/add-task/add-task.component';
import { TasksComponent } from './components/dashboard/tasks/tasks.component';
import { TaskListComponent } from './components/dashboard/admin/task-list/task-list.component';

export const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: 'add-task',
        component: AddTaskComponent,
      },
      {
        path: 'task-list',
        component: TaskListComponent,
      },
     
    ]
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
