import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Profile } from '../profile.interface';
import { SupabaseService } from '../services/supabase.service';
@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<Profile> {
  constructor(private auth: SupabaseService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Profile> | Observable<Profile> {
    return this.auth.getUserProfile();
  }
}
