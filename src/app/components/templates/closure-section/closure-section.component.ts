import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'templates-closure-section',
  templateUrl: './closure-section.component.html',
  styleUrls: ['./closure-section.component.scss']
})
export class ClosureSectionComponent implements OnInit {

  @Input() section;
  @Input() closureFG: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
