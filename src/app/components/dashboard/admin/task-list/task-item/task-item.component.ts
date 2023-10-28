import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/task.interface';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  constructor() { }
  @Input() task!: Task

  ngOnInit(): void {
  }

}
