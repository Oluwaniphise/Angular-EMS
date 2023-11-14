import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/profile.interface';
import { SupabaseService } from 'src/app/services/supabase.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userProfile!: Profile;
  taskList!: Task[];
  loading = false
  constructor(private route: ActivatedRoute, private auth: SupabaseService, private tasks: TasksService) {}



  ngOnInit() {
   
    this.userProfile = this.route.snapshot.data['profile']
    this.taskList = this.route.snapshot.data['userTasks']
    
  }

  

}
