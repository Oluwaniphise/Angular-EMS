import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/employee.interface';
import { Profile } from 'src/app/profile.interface';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(private auth: SupabaseService, private activatedRoute: ActivatedRoute) {}
  employees!: Employee[];



  ngOnInit() {
    this.employees = this.activatedRoute.snapshot.data['employees']
    console.log(this.employees)

  }
}
