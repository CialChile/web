import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {TemplatesEquipmentHelper} from "../helpers/template-equipment-helper";

@Component({
  selector: 'templates-equipment-section',
  templateUrl: './equipment-section.component.html',
  styleUrls: ['./equipment-section.component.scss']
})
export class EquipmentSectionComponent implements OnInit {
  @Input() section;
  @Input() equipmentFG: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  get equipmentList(): FormArray {
    return this.equipmentFG.get('equipmentList') as FormArray;
  };

  addEquipment() {
    let field: FormGroup = TemplatesEquipmentHelper.generateEquipment();
    this.equipmentList.push(field)
  }

  removeEquipment(index: number) {
    this.equipmentList.removeAt(index)
  }

  addSection() {
    this.section.visible = true;
  }

  removeSection() {
    this.section.visible = false;
    const equipmentsLength = this.equipmentList.controls.length;
    for (let i = equipmentsLength - 1; i >= 0; i--) {
      this.equipmentList.removeAt(i);
    }
  }

}
