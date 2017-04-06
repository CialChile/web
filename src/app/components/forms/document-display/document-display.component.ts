import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-document-display',
  templateUrl: './document-display.component.html',
  styleUrls: ['./document-display.component.scss']
})
export class DocumentDisplayComponent implements OnInit {
  @Input() document: any;
  @Input() canDelete: boolean = true;
  @Output() onDeleteFile = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  deleteFile() {
    this.onDeleteFile.emit(this.document.id)
  }


}
