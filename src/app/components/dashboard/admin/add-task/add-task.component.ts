import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTaskForm!: FormGroup
  employees: Employee[] = []
  loading = false
  constructor(private fb: FormBuilder, private taskService: TasksService, private router: Router) { }

  async getEmployees(){
   await this.taskService.getEmployees().then((res) => {
      this.employees = res
    })
  }

  async addTask(){
    
  }

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      task: this.fb.control('', [Validators.required]),
      created_at: this.fb.control('', [Validators.required]),
      status: this.fb.control('', [Validators.required]),
      employee: this.fb.control('', [Validators.required]),
    })

    this.getEmployees()
  }



  onSubmit(){
    this.loading = true
    this.taskService.addTask(this.addTaskForm.value).then((res) => {
      console.log(res)
      this.router.navigate(['/admin/task-list'])
    }).catch(err => console.log(err)).finally(
      () => {
        this.loading= false
      }
    )
   
  }

}
