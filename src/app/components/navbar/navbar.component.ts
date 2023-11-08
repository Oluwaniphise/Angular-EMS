import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, Input} from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/profile.interface';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  @Input() userProfile?: Profile

  caretDown = faCaretDown
  constructor(private auth: SupabaseService, private route: Router) {
    this.isLoggedIn = auth.isLoggedIn()
    this.isAdmin = auth.isAdminSubject
   }

  async logout() { 
    this.userProfile = undefined;
    await this.auth.signOut()
    this.route.navigate(['/login'])
  }

 ngOnInit(): void {
     
 }
}
