import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageFile} from "./types/ImageFile";

@Component({
  selector: 'etrack-image-upload',
  templateUrl: './etrack-image-upload.component.html',
  styleUrls: ['./etrack-image-upload.component.scss']
})
export class EtrackImageUploadComponent implements OnInit {

  @Input() buttonMessage: string = 'Elige una imagen';
  @Input() defaultImageUrl: string;
  @Input() file: ImageFile = {
    objectURL: '',
    notDefault: false,
    deleted: false
  };

  @Output() fileUpdated = new EventEmitter();

  private files = [];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  fileChange(files) {
    let file = files[0];
    if (this.isImage(file)) {
      file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
      file.notDefault = true;
      this.file = file;
      this.fileUpdated.emit(this.file);
    } else {

    }
  }

  isImage(file) {
    return /^image\//.test(file.type);
  };

  deleteFile(file) {
    this.file = {
      objectURL: '',
      notDefault: false,
      deleted: true
    };
    this.fileUpdated.emit(this.file);
  }

}
