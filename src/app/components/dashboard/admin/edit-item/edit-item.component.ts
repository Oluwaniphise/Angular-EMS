import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/task.interface';
import { TasksService } from 'src/app/services/tasks.service';
import { Employee } from 'src/app/employee.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TasksService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<EditItemComponent>
  ) {}
  editForm!: FormGroup;
  employees: Employee[] = [];
  loading = false;

  async getEmployees() {
    await this.taskService.getEmployees().then((res) => {
      this.employees = res;
    });
  }

  onSubmit() {
    this.loading = true;
    this.taskService
      .updateTask(this.editForm.value)
      .then((_) => {
        this.dialogRef.close(this.task)
      })
      .catch((err) => { 
        console.log(err)
      })
      .finally(() => {
        this.loading = false;
      });
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      task: this.fb.control(this.task.task, [Validators.required]),
      created_at: this.fb.control(this.task.created_at, [Validators.required]),
      status: this.fb.control(this.task.status, [Validators.required]),
      employee: this.fb.control(this.task.employee, [Validators.required]),
      id: this.fb.control(this.task.id),
    });

    this.getEmployees();
  }
}
