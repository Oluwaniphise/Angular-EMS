import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: SupabaseService, private router: Router){}
  loading = false

  ngOnInit() {
    this.router.events.subscribe(ev => {
      // console.log(ev)
      if(ev instanceof NavigationStart){
        this.loading = true
      }

      if(ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError){
        this.loading = false
      }
    })


    }
    
  title = 'EMS';
}
