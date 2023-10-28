import { Component, OnInit, Input } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticatedUser!: object;

  constructor(private auth: SupabaseService, private route: Router) { }

  signOut(){
    this.auth.signOut().then(res => {
      console.log(res)
      this.route.navigate(['/login']) 
      this.auth.removeSessionFromLocalStorage()
    }).catch(err => {
    console.log(err)
    
  })
}

  ngOnInit(): void {
    this.authenticatedUser = this.auth.getSessionFromLocalStorage();
  }
}
