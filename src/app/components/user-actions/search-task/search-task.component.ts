import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {  faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchTerm } from './search.interface';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {

  constructor() { }
  @Output() emitSearch: EventEmitter<string> = new EventEmitter()

  faSearch = faSearch

  ngOnInit(): void {
    
  }

  searchValue = ''
  searchTask(search: string){
    this.emitSearch.emit(search)
  }

}
