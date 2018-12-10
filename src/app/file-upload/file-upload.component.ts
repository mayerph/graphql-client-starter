import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() url: any
  @Input() width: string
  @Output() fileToUpload = new EventEmitter();
  image: any

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
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

}
