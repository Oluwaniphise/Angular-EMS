import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { AddTaskComponent } from './components/dashboard/admin/add-task/add-task.component';
import { TaskListComponent } from './components/dashboard/admin/task-list/task-list.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PermissionGuard } from './guard/permission.guard';
import { FormGuardGuard } from './guard/form-guard.guard';
import { UserTasks } from './resolver/user-tasks-resolver.resolver';
import { UserProfileResolver } from './resolver/user-profile.resolver';
import { AllTasksResolver } from './resolver/all-tasks.resolver';
import { getEmployees } from './resolver/get-employees.resolver';
import { EmployeeDetailComponent } from './components/user-actions/employee-list/employee-detail/employee-detail.component';
import { SessionGuard } from './guard/session.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      userTasks: UserTasks,
      profile: UserProfileResolver,
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [PermissionGuard],
    resolve: {
      profile: UserProfileResolver,
    },
    children: [
      {
        path: 'add-task',
        component: AddTaskComponent,
        canDeactivate: [FormGuardGuard],
      },
      {
        path: 'task-list',
        component: TaskListComponent,
        resolve: {
          tasks: AllTasksResolver,
          profile: UserProfileResolver,
          employees: getEmployees,
        },
      },
      {
        path: 'employee/:id',
        component: EmployeeDetailComponent,
      },
      {
        path: '',
        redirectTo: 'task-list',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SessionGuard]

  },
  {
    path: '',
    component: HomeComponent,
    redirectTo: '',
    pathMatch: 'full',
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
