import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  constructor() { }
  @Input() task!: Task
  @Output() updateProgress: EventEmitter<Task> = new EventEmitter()

  inProgress(task: Task){
    this.updateProgress.emit(task)
    
  }
  ngOnInit(): void {
  }

}
