import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/task.interface';
import { TasksService } from 'src/app/services/tasks.service';
import { Employee } from 'src/app/employee.interface';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  title: string = 'Edit Task';
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TasksService,
    private router: Router,
    public dialogRef: MatDialogRef<EditItemComponent>
  ) {}
  loading = false;


  editTask(task: Task) {
    console.log(task)
    // this.taskService
    //   .updateTask(task)
    //   .then((_) => {
    //     this.dialogRef.close(task)
    //   })
    //   .catch((err) => console.log(err)).finally(() => {
    //     this.taskFormComponent.taskForm.reset()
    //   });
  }
  ngOnInit() {
  }
}
