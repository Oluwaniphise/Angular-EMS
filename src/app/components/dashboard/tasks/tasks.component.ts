import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  loading = false;
  @Input() tasksList: Task[] = [];
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


  // without else if
  printYear(year: number){
    if(year % 4 === 0 || (year % 100 !== 0 && year % 400 === 0)){
      console.log('is a leap year')
  } else{
    console.log("is not leap year") 
  }
}

// with else if
 printYear2(year: number) {
  if (year % 400 === 0) {
    console.log('is a leap year');
  } else if (year % 100 !== 0 && year % 4 === 0) {
    console.log('is a leap year');
  }  else {
    console.log('is not a leap year');
    
  }
 }
 
 ngOnInit() {

    // this.printYear(2001)
    // this.printYear2(2001)

    console.log(this.tasksList)
  }
}
