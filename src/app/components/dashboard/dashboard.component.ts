import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/profile.interface';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProfile!: Profile
  constructor(private auth: SupabaseService, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.userProfile = this.route.snapshot.data['profile']
  }

}
