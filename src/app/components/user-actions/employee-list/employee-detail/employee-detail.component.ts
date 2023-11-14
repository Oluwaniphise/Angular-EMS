import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  tasksList!: Task[]
  id!: string
  constructor(private tasks: TasksService, private route: ActivatedRoute) { }


  async ngOnInit() {
    this.id = this.route.snapshot.params.id
    const tasks = await this.tasks.getUserTasksByEmployeeID(this.id)
    this.tasksList = tasks
  }

}
