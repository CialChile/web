import {Component, OnInit, Input} from '@angular/core';
import {MenuItem} from "../../types/MenuItem";

@Component({
  selector: '[app-topbar-dropdown-item]',
  templateUrl: './topbar-dropdown-item.component.html',
  styleUrls: ['./topbar-dropdown-item.component.scss']
})
export class TopbarDropdownItemComponent implements OnInit {

  @Input() item: MenuItem;

  constructor() {
  }

  ngOnInit() {
  }

}
