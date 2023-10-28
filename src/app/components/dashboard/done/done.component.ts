import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/task.interface';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor() { }
  @Input() task!: Task
  @Output() backToInProgress: EventEmitter<Task> = new EventEmitter()

  faBack = faStepBackward

  reverseToInProgress(task: Task){
    this.backToInProgress.emit(task)
  }

  ngOnInit(): void {
  }

}
