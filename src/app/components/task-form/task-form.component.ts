import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/employee.interface';
import { SupabaseService } from 'src/app/services/supabase.service';
import { AddTask, Task } from 'src/app/task.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskControl!: FormControl;
  descriptionControl!: FormControl;
  deadlineControl!: FormControl;
  employeeControl!: FormControl;

  @Input() taskData!: Task;
  @Input() title: string = '';
  @Output() onAddTask: EventEmitter<AddTask> = new EventEmitter();
  @Output() onEditTask: EventEmitter<AddTask> = new EventEmitter();


  employees!: Employee[];
  date = new Date()

  constructor(private fb: FormBuilder, private auth: SupabaseService) {}

  async getEmployees() {
    await this.auth.getEmployees().then((res) => {
      this.employees = res;
    });

  }

  initForm(taskData?: Task) {
    if (taskData) {
      this.taskForm = this.fb.group({
        task: [taskData.task, [Validators.required]],
        employee: [taskData.profiles.id, [Validators.required]],
        description: [taskData.description, [Validators.required]],
        deadline: [taskData.deadline, [Validators.required]],
        id: [taskData.id, []],
      });
    } else {
      this.taskForm = this.fb.group({
        task: ['', [Validators.required]],
        employee:['', [Validators.required]],
        description: ['', [Validators.required]],
        deadline: ['', [Validators.required]],


      });
    }
  }
  
  ngOnInit(): void {
    if (this.taskData) {
      this.initForm(this.taskData);
    } else {
      this.initForm();
    }

    this.getEmployees();

    this.taskControl = this.taskForm.get('task') as FormControl;
    this.descriptionControl = this.taskForm.get('description') as FormControl;
    this.deadlineControl = this.taskForm.get('deadline') as FormControl;
    this.employeeControl = this.taskForm.get('employee') as FormControl;

  }

  submitForm() {
    if (this.taskData) {
      this.onEditTask.emit(this.taskForm.value);
    } else {
      this.onAddTask.emit(this.taskForm.value);
    }
  }


}
