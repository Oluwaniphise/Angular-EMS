import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private tasks: TasksService, private dialog: MatDialog) {}

  loading = false;
  listOfTasks!: Task[];

  async getTaskList() {
    this.loading = true;
    await this.tasks.getTasks().then((tasks) => {
      console.log(tasks)
      this.listOfTasks = tasks;
      this.loading = false;
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '500px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((editedTask) => {
      if (editedTask) {
        this.getTaskList();
      }
    });
  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width: '500px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((editedTask) => {
      if (editedTask) {
        this.getTaskList();
      }
    });
  }

  ngOnInit() {
    this.getTaskList();
  }
}
