import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: SupabaseService){}
  authenticatedUser!: object

  ngOnInit(): void {
    this.authenticatedUser = this.auth.getSessionFromLocalStorage()
  
    }
    
  title = 'EMS';
}
