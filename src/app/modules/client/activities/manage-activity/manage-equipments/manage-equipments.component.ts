import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormArray} from "@angular/forms";
import {TemplatesEquipmentHelper} from "../../../../../components/templates/helpers/template-equipment-helper";

@Component({
  selector: 'app-activity-manage-equipments',
  templateUrl: './manage-equipments.component.html',
  styleUrls: ['./manage-equipments.component.scss']
})
export class ManageEquipmentsComponent implements OnInit {

  @Input() equipmentFG: FormGroup;
  @Input() canBeEdited: boolean;

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

}
