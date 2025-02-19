import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {  faFilter,faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.css']
})
export class FilterTaskComponent implements OnInit {
  faFilter = faFilter
  faCaretDown = faCaretDown

  selectedCategory: string = ''
  constructor() { }

  ngOnInit(): void {
  }
  @Output() filterChanged = new EventEmitter<string>();

  applyFilter(){
    this.filterChanged.emit(this.selectedCategory)
  }

}
