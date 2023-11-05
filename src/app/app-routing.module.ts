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
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { EditItemComponent } from './components/dashboard/admin/edit-item/edit-item.component';
import { PermissionGuard } from './guard/permission.guard';
import { FormGuardGuard } from './guard/form-guard.guard';
import { TasksResolverResolver } from './resolver/user-tasks-resolver.resolver';
import { UserProfileResolver } from './resolver/user-profile.resolver';
import { AllTasksResolver } from './resolver/all-tasks.resolver';

export const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      userTasks: AllTasksResolver,
      profile: UserProfileResolver
    }
    
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [PermissionGuard],
    children:[

      
      {
        path: 'add-task',
        component: AddTaskComponent,
        canDeactivate:[FormGuardGuard]
      },
      {
        path: 'task-list',
        component: TaskListComponent,
        resolve: {
          tasks: AllTasksResolver,
          

        }

        
      },
      {
        path: '',
        redirectTo: 'task-list', pathMatch: 'full'
      }
      
     
    ]
  },
  
  {
    path: 'login',
    component: LoginComponent,
  
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomeComponent,
    redirectTo: '', pathMatch: 'full'

  },
  {
    path: '**',
    component: PagenotfoundComponent,
    
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
