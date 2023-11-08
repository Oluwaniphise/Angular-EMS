import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Profile } from './profile.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userProfile!: Profile;
  title = 'EMS';

  constructor(private auth: SupabaseService, private router: Router){
    if (this.auth.Profile) {
      this.userProfile = this.auth.Profile
    }
  }
  loading = false

  
  ngOnInit() {
    this.router.events.subscribe(ev => {
      if(ev instanceof NavigationStart){
        this.loading = true
      }

      if(ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError){
        this.loading = false
      }
    })


    }
    
}
