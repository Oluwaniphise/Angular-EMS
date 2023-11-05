import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Profile } from '../profile.interface';
import { Employee } from '../employee.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.isAdminSubject.next(this.isAdmin());
    console.log(this.isAdmin());
  }

  get currentRole() {
    return this.isAdminSubject.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  private isAdmin(): boolean {
    const storedUser = localStorage.getItem('UserProfile');
    let user: any;
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    if (user !== null && user?.role === 'admin') return true;
    return false;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password,
    });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  saveSessiontoLocalStorage(token: any) {
    localStorage.setItem('access_token', JSON.stringify(token));
  }

  getSessionFromLocalStorage(): any {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString !== null) {
      const user = jwtDecode(tokenString);
      return user;
    }
  }

  removeSessionFromLocalStorage(): any {
    localStorage.removeItem('access_token');
  }

  async getUserProfile(): Promise<Profile> {
    const tokenString = localStorage.getItem('access_token');
    let user: any;
    if (tokenString !== null) {
      user = jwtDecode(tokenString);
    }
    const { data, error } = await this.supabase

      .from('profiles')
      .select('*')
      .eq('email', user.email)
      .single();
    localStorage.setItem('UserProfile', JSON.stringify(data));

    this.isAdminSubject.next(this.isAdmin());

    if (error) {
      return error as unknown as Profile;
    }

    return data as unknown as Profile;
  }

  async getEmployees(): Promise<Employee[]> {
    const { data, error } = await this.supabase

      .from('profiles')
      .select('*')
      .eq('role', 'user');

    if (error) {
      return error as unknown as Employee[];
    }

    return data as unknown as Employee[];
  }

  get supabaseClient() {
    return this.supabase;
  }
}
