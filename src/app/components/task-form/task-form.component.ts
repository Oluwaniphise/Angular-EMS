import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/employee.interface';
import { SaveData } from 'src/app/save-data-interface';
import { SupabaseService } from 'src/app/services/supabase.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  @Input() taskData!: Task;
  @Input() title: string = '';
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
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
        task: this.fb.control(taskData.task, [Validators.required]),
        employee: this.fb.control(taskData.employee, [Validators.required]),
        description: this.fb.control(taskData.description, [Validators.required]),
        deadline: this.fb.control(taskData.deadline, [Validators.required]),
        id: this.fb.control(taskData.id, []),
      });
    } else {
      this.taskForm = this.fb.group({
        task: this.fb.control('', [Validators.required]),
        employee: this.fb.control('', [Validators.required]),
        description: this.fb.control('', [Validators.required]),
        deadline: this.fb.control('', [Validators.required]),


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

  console.log(this.date.toISOString())

  }

  submitForm() {
    if (this.taskData) {
      this.onEditTask.emit(this.taskForm.value);
    } else {
      this.onAddTask.emit(this.taskForm.value);
    }
  }


}
