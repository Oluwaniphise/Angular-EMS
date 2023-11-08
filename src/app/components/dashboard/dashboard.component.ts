import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/profile.interface';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {
  userProfile!: Profile
  taskList!: Task[]
  constructor(private auth: SupabaseService, private route: ActivatedRoute) {}



  ngOnInit(): void {
    this.userProfile = this.route.snapshot.data['profile']
    this.taskList = this.route.snapshot.data['userTasks']
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnDestroy(): void {
      
  }

}
