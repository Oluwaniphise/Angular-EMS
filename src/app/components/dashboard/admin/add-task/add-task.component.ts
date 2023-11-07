import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { SaveData } from 'src/app/save-data-interface';
import { Task } from 'src/app/task.interface';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, SaveData {
  loading = false;
  title: string = 'Add Task'
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent
  constructor(private taskService: TasksService, private router: Router) {}

  ngOnInit(): void {
    
  }

  addTask(taskData: Task) {
    this.taskService
      .addTask(taskData)
      .then((res) => {
        this.router.navigate(['/admin/task-list']);
        this.taskFormComponent.taskForm.reset()
      })
      .catch((err) => console.log(err)).finally(() => {
        this.taskFormComponent.taskForm.reset()
      });
  }

  isDataSaved(): boolean{
    return !this.taskFormComponent.taskForm.dirty
  }
}
