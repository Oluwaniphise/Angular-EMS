import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable,  } from 'rxjs';
import { Profile } from '../profile.interface';
import { Employee } from '../employee.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserProfile!: BehaviorSubject<Profile>;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  

  constructor() {
    
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    const user = localStorage.getItem('UserProfile')
    if(user){
      this.currentUserProfile = new BehaviorSubject<Profile>(JSON.parse(user))
    } else {
      this.currentUserProfile = new BehaviorSubject<Profile>(JSON.parse('null') as unknown as Profile)
    }

    this.isAdminSubject.next(this.isAdmin());
  }

  // get currentRole() {
  //   return this.isAdminSubject.value;
  // }

  get Profile(){
    return this.currentUserProfile.value as Profile
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

  removeSessionFromLocalStorage(): any {
    localStorage.removeItem('access_token');
    localStorage.removeItem('UserProfile');
    localStorage.removeItem('supabaseUser');
  }

  async signOut(){
    const signout = await this.supabase.auth.signOut();

    if (signout.error) {
      return signout.error;
    } else {
      this.removeSessionFromLocalStorage();
      this.isLoginSubject.next(false);
      this.isAdminSubject.next(false);
      this.currentUserProfile.next(null as unknown as Profile)
      return signout;
    }
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

 
// get user profile
  async getUserProfile(): Promise<Profile> {
    const tokenString = localStorage.getItem('access_token');
    let user: any;
    if (tokenString !== null) {
      user = jwtDecode(tokenString);
    }
    const { data, error } = await this.supabase

      .from('profiles')
      .select('*')
      .eq('email', user?.email)
      .single();
    localStorage.setItem('UserProfile', JSON.stringify(data));

    this.isAdminSubject.next(this.isAdmin());

    if (error) {
      return error as unknown as Profile;
    }

    return data as unknown as Profile;
  }

  // get all employees
  async getEmployees(): Promise<Employee[]> {
    const { data, error } = await this.supabase

      .from('profiles')
      .select('*');

    if (error) {
      return error as unknown as Employee[];
    }

    return data as unknown as Employee[];
  }

  get supabaseClient() {
    return this.supabase;
  }

  get Employees(){
    return this.getEmployees()
  }
}
