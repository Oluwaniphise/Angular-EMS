import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  loading = false;
  @Input() tasksList!: Task[];
  constructor(private tasks: TasksService) {

  }
  
  async getTasks() {
    this.loading = true;
    await this.tasks.getUserTasksByProfile().then((tasks) => {
      this.tasksList = tasks;
      this.loading = false;
    });
  }

  filterTasks(status: string){
    return this.tasksList.filter(s => s.status === status)
  }


  updateToProgress(task: Task) {
    this.loading = true;
    this.tasks.setToInProgress(task).then((_) => {
      this.getTasks();
      this.loading = false;
    });
  }

  returnBackToPending(task: Task) {
    this.loading = true;
    this.tasks.backToPending(task).then((_) => {
      this.getTasks();
      this.loading = false;
    });
  }

  updateToDone(task: Task) {
    this.loading = true;
    this.tasks.setToDone(task).then(_ => {
      this.getTasks()
      this.loading = false
    })
  }

  returnBackToInProgress(task: Task){
    this.loading = true
    this.tasks.backToInProgress(task).then(_ => {
      this.getTasks()
      this.loading = false
    })
  }

  ngOnInit() {
  }
}
