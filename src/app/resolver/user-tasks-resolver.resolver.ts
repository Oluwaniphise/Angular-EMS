import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Task } from '../task.interface';

@Injectable({
  providedIn: 'root'
})
export class UserTasks implements Resolve<Task []> {
  constructor(private taskService:TasksService, ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Task[]> | Observable<Task[]> {

    return this.taskService.getUserTasksByProfile()
  }
}
