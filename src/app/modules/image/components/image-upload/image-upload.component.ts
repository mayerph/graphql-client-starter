import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() url: any
  @Input() defaultUrl: any
  @Output() fileToUpload = new EventEmitter();
  image: any

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.url = this.defaultUrl
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const arrayBuffer = event.target.result;
        const imageData = new Blob([arrayBuffer] , {type: 'image/png' });

        this.image = imageData
        this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageData));
        this.fileToUpload.emit(this.image);
      }
      reader.readAsArrayBuffer(event.target.files[0]);
    }
  }

  removeImage() {
    this.url = this.defaultUrl
    this.fileToUpload.emit(null);
  }

}
