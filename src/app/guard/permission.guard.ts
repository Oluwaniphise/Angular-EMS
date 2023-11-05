import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Profile } from '../profile.interface';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivateChild {
  constructor(private auth: SupabaseService, private router: Router) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.getUserProfile().then((res) => {
      console.log(res);
      if (res?.role === 'admin') return true;
      alert('You are not an admin');
      return this.router.parseUrl('/dashboard');
    });
  }
}
