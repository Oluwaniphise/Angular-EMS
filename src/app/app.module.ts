import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { TasksComponent } from './components/dashboard/tasks/tasks.component';
import { PendingComponent } from './components/dashboard/pending/pending.component';
import { InProgressComponent } from './components/dashboard/in-progress/in-progress.component';
import { DoneComponent } from './components/dashboard/done/done.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { AddTaskComponent } from './components/dashboard/admin/add-task/add-task.component';
import { TaskListComponent } from './components/dashboard/admin/task-list/task-list.component';
import { TaskItemComponent } from './components/dashboard/admin/task-list/task-item/task-item.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { EditItemComponent } from './components/dashboard/admin/edit-item/edit-item.component';
import { DeleteTaskComponent } from './components/dashboard/admin/delete-task/delete-task.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { DayDifferencePipe } from './utils/DayDifferencePipe';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UserActionsComponent } from './components/user-actions/user-actions.component';
import { SearchTaskComponent } from './components/user-actions/search-task/search-task.component';
import { FilterTaskComponent } from './components/user-actions/filter-task/filter-task.component';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    TasksComponent,
    PendingComponent,
    InProgressComponent,
    DoneComponent,
    AdminComponent,
    AddTaskComponent,
    TaskListComponent,
    TaskItemComponent,
    PagenotfoundComponent,
    EditItemComponent,
    DeleteTaskComponent,
    ConfirmDialogComponent,
    TaskFormComponent,
    DayDifferencePipe,
    UserActionsComponent,
    SearchTaskComponent,
    FilterTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    FontAwesomeModule,
    MatButtonModule,
    MatMenuModule, 
    MatIconModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      allowedDomains: ["localhost:4200"]
      },
    }),
  
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
