import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from '../task.interface';
import { TasksService } from '../services/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class AllTasksResolver implements Resolve<Task[]> {
  constructor(private tasks: TasksService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<Task[]> | Observable<Task[]> {
    return this.tasks.getTasks() ;
  }
}
