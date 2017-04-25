import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {SelectItem} from "primeng/components/common/api";
import {TemplatesDocumentsHelper} from "../helpers/template-documents-helper";

@Component({
  selector: 'templates-documents-section',
  templateUrl: './documents-section.component.html',
  styleUrls: ['./documents-section.component.scss']
})
export class DocumentsSectionComponent implements OnInit {
  @Input() section;
  @Input() documentsFG: FormGroup;
  documentTypes: SelectItem[] = [
    {label: 'Pdf', value: 'pdf'},
    {label: 'Word', value: 'docx'},
    {label: 'Excel', value: 'xlsx'},
    {label: 'Imagen', value: 'image'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

  get documentList(): FormArray {
    return this.documentsFG.get('documentList') as FormArray;
  };

  addDocument() {
    let documentFG: FormGroup = TemplatesDocumentsHelper.generateDocument();
    this.documentList.push(documentFG)
  }

  removeDocument(index: number) {
    this.documentList.removeAt(index)
  }

  addSection() {
    this.section.visible = true;
  }

  removeSection() {
    this.section.visible = false;
    const documentsLength = this.documentList.controls.length;
    for (let i = documentsLength - 1; i >= 0; i--) {
      this.documentList.removeAt(i);
    }
  }

}
