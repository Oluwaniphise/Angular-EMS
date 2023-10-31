import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee.interface';
import { TasksService } from 'src/app/services/tasks.service';
import { SaveData } from 'src/app/save-data-interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, SaveData {

  addTaskForm!: FormGroup
  employees: Employee[] = []
  loading = false
  isSubmitted = false
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
      employee: this.fb.control('', [Validators.required]),
    })

    this.getEmployees()
  }

  isDataSaved() {
    return !this.addTaskForm.dirty
  }

  onSubmit(){
    this.loading = true
    this.taskService.addTask(this.addTaskForm.value).then((res) => {
      console.log(res)
      this.addTaskForm.reset()
      this.router.navigate(['/admin'])
    }).catch(err => console.log(err)).finally(
      () => {
        this.loading= false
      }
    )
   
  }


 

}
