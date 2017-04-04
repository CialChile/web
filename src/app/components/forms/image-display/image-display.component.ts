import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  @Input() image: any;
  @Input() canDelete: boolean = true;
  @Output() onDeleteFile = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  deleteFile() {
    this.onDeleteFile.emit(this.image.id)
  }

}
