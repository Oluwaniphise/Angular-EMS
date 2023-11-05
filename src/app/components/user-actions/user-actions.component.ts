import { Component, OnInit } from '@angular/core';
import { faFilter, faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css']
})
export class UserActionsComponent implements OnInit {
  faFilter = faFilter
  faCaretDown = faCaretDown
  faSearch = faSearch

  constructor() { }

  ngOnInit(): void {
  }

}
