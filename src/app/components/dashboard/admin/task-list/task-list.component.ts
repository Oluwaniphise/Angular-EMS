import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private tasks: TasksService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  loading = false;
  listOfTasks!: Task[];
  filteredTasks!: Task[];

  async getTaskList() {
    this.loading = true;
    await this.tasks.getTasks().then((tasks) => {
      this.listOfTasks = tasks;
      this.filteredTasks = [...this.listOfTasks];
      this.loading = false;
    });
  }
  async getUserTasks() {
    await this.tasks.getUserTasksByProfile().then((tasks) => {
      console.log(tasks);
    }).catch(err => console.log(err));
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

  searchText: string = '';

  searchTask(searchValue: string) {
    this.searchText = searchValue;
  }

  onFilteredChange(selectedCategory: string) {
    if (selectedCategory === '') {
      this.filteredTasks = [...this.listOfTasks];
    } else {
      this.filteredTasks = this.listOfTasks.filter(
        (task) => task.status === selectedCategory
      );
    }
  }
  ngOnInit() {

    this.listOfTasks = this.activatedRoute.snapshot.data['tasks']
    this.filteredTasks = [...this.listOfTasks];

    this.getUserTasks();
  }
}
