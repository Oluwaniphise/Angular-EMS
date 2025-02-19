import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/task.interface';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  constructor() { }

  showDetails = false
  @Input() task!: Task
  @Output() editTaskOutput: EventEmitter<Task> = new EventEmitter()
  @Output() deleteTaskOutput: EventEmitter<Task> = new EventEmitter()
  faEdit = faPencilAlt
  faDelete = faTrash
  ngOnInit(): void {
  }

  editTask(task: Task){
    this.editTaskOutput.emit(task)
  }

  deleteTask(task: Task){
    this.deleteTaskOutput.emit(task)
  }

}
