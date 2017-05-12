import {Component, OnInit, Input} from '@angular/core';
import {PersonValidationConstraintBuilder} from "../../../utilities/templates/personValidationConstriantBuilder";

@Component({
  selector: 'app-persons-validation-constraint-list',
  templateUrl: './persons-validation-constraint-list.component.html',
  styleUrls: ['./persons-validation-constraint-list.component.scss']
})
export class PersonsValidationConstraintListComponent implements OnInit {

  @Input() validations;
  public constraints: string[];

  constructor() {
  }

  ngOnInit() {
    this.constraints = new PersonValidationConstraintBuilder(this.validations).build()
  }

}
