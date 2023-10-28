import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
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

  get supabaseClient(){
    return this.supabase
  }

  


  
}
