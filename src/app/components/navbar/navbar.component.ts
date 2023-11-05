import { Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/profile.interface';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  userProfile!: Profile

  caretDown = faCaretDown
  constructor(private auth: SupabaseService, private route: Router) {
    this.isLoggedIn = auth.isLoggedIn()
    this.isAdmin = auth.isAdminSubject
   }

  signOut(){
    this.auth.signOut().then(_ => {
      this.auth.removeSessionFromLocalStorage()
      localStorage.removeItem('UserProfile')
      this.auth.isLoginSubject.next(false)
      this.auth.isAdminSubject.next(false)
      this.route.navigate(['/login'])
    }).catch(err => {
    console.log(err)
    
  })
}



  async ngOnInit() {
   const userProfile = await this.auth.getUserProfile()
   this.userProfile = userProfile
  }
}
