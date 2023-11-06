import { Component, OnInit } from '@angular/core';
import {  faFilter,faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.css']
})
export class FilterTaskComponent implements OnInit {
  faFilter = faFilter
  faCaretDown = faCaretDown
  constructor() { }

  ngOnInit(): void {
  }

}
