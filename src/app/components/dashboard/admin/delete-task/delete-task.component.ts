import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';
@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css'],
})
export class DeleteTaskComponent implements OnInit {
  loading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TasksService,
    public dialogRef: MatDialogRef<DeleteTaskComponent>
  ) {}

  onSubmit() {
    this.loading = true;
    this.taskService
      .deleteTask(this.task)
      .then((_) => {
        this.dialogRef.close(this.task);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  ngOnInit() {}
}
