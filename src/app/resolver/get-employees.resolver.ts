import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SupabaseService } from '../services/supabase.service';
import { Employee } from '../employee.interface';

@Injectable({
  providedIn: 'root'
})
export class getEmployees implements Resolve<Employee []> {
  constructor(private auth:SupabaseService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Employee[]> | Observable<Employee[]> {
    return this.auth.Employees
  }
}
