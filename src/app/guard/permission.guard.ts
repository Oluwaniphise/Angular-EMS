import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Profile } from '../profile.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivateChild {
  constructor(private auth: TasksService, private router: Router){}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.getUserProfile().then((res) => {
        if(Array.isArray(res) && res.some(item => item.role === 'admin')){
          return true
        } 
        else{
          alert("you're not an admin")
      return this.router.parseUrl('/dashboard'); 

        }
      })
     

  }
  
}
