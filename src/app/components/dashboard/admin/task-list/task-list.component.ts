import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  constructor(private tasks: TasksService) { }

  loading = false
  listOfTasks!: Task[];

  
  async getTaskList() {
    this.loading = true;
    await this.tasks.getTasks().then((tasks) => {
      this.listOfTasks = tasks;
      console.log(this.listOfTasks)
      this.loading = false;
    });
  }

  ngOnInit() {
    this.getTaskList()

  }

}
