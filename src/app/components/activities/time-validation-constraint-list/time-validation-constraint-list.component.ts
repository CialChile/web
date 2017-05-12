import {Component, OnInit, Input} from '@angular/core';
import {TimeValidationConstraintBuilder} from "../../../utilities/templates/timeValidationConstraintBuilder";

@Component({
  selector: 'app-time-validation-constraint-list',
  templateUrl: './time-validation-constraint-list.component.html',
  styleUrls: ['./time-validation-constraint-list.component.scss']
})
export class TimeValidationConstraintListComponent implements OnInit {

  @Input() validations;
  public constraints: string[];

  constructor() {
  }

  ngOnInit() {
    this.constraints = new TimeValidationConstraintBuilder(this.validations).build()
  }

}
