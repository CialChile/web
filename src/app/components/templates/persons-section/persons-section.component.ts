import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'templates-persons-section',
  templateUrl: './persons-section.component.html',
  styleUrls: ['./persons-section.component.scss']
})
export class PersonsSectionComponent implements OnInit {

  @Input() section;
  @Input() personsFG: FormGroup;
  @Input() isAdmin: boolean;
  editingSupervisor: boolean;
  addingSupervisor: boolean;
  addingOperator: boolean;
  editingOperator: boolean;
  editOperatorIndex: number;
  editSupervisorIndex: number;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastr: ToastsManager) {

  }

  ngOnInit() {

  }

  get operator(): FormArray {
    return this.personsFG.get('operator') as FormArray;
  };

  get supervisor(): FormArray {
    return this.personsFG.get('supervisor') as FormArray;
  };

  addSection() {
    this.section.visible = true;
  }

  removeSection() {
    this.section.visible = false;
    const operatorLength = this.operator.controls.length;
    for (let i = operatorLength - 1; i >= 0; i--) {
      this.operator.removeAt(i);
    }
  }

  editSupervisorValidation(program, index: number) {
    this.editingSupervisor = true;
    this.addingSupervisor = false;
    this.editSupervisorIndex = index;
  }

  removeSupervisorValidation(index: number) {
    this.supervisor.removeAt(index);
    if (this.editSupervisorIndex == index) {
      this.editingSupervisor = false;
      this.addingSupervisor = false;
      this.editOperatorIndex = null;
    }
  }

  editOperatorValidation(validation, index: number) {
    this.editingOperator = true;
    this.addingOperator = false;
    this.editOperatorIndex = index;
  }

  removeOperatorValidation(index: number) {
    this.operator.removeAt(index)
    if (this.editOperatorIndex == index) {
      this.editingOperator = false;
      this.addingOperator = false;
      this.editOperatorIndex = null;
    }
  }

  newOperatorValidation() {
    this.addingOperator = true;
    this.editingOperator = false;
  }

  newSupervisorValidation() {
    this.addingSupervisor = true;
    this.editingSupervisor = false;
  }

  hideSupervisorForm() {
    this.editingSupervisor = false;
    this.addingSupervisor = false;
  }

  hideOperatorForm() {
    this.editingOperator = false;
    this.addingOperator = false;
  }
}
