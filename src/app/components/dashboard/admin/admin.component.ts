import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/profile.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userProfile!: Profile
  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.userProfile = this.route.snapshot.data['profile']
  }

}
