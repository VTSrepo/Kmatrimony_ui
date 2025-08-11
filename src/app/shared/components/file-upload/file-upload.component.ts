import { Component, Input, OnInit } from '@angular/core';

import { FileUploadService } from './fileupload/fileupload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { PhotoViewerComponent } from '../../photo-viewer/photo-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input() profileCode: string = '';
  @Input() isEditable: boolean = false;
  selectedFile: File | null = null;
  uploadStatus: string = '';
  files: string[] = [];
  types = ['Horoscope', 'Profile'];
  uploadTypes = [{type:'Horoscope', hidden:false}, {type:'Profile1', hidden:false},{type:'Profile2', hidden:false}]
  doctype = '';
  isAdmin = false;
  uploadLimitReached = false;
  uploadLimit = { profile1UploadCount: 0,profile2UploadCount: 0, horoscopeUploadCount: 0 };

  constructor(
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      if(isAdmin){
        this.isAdmin = isAdmin;
      } else {
        this.isAdmin = this.authService.validateAdmin()
      }
    });
  }

  ngOnInit(): void {    
    this.refresh();   
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  uploadFile(): void {
    if (this.selectedFile) {
      const fileExtension = this.getFileExtension(this.selectedFile.name);
      this.uploadStatus = 'Uploading...';

      //validate file size
      if (this.selectedFile.size > 3000 * 1024) {
        this.uploadStatus = `File size limit exceeded. Please upload upto 5MB.`;
        this.selectedFile = null;
        return;
      }

      //build filename
      const fileName = this.profileCode + '_' + this.doctype + fileExtension;
      const renamedFile = new File([this.selectedFile], fileName, {
        type: this.selectedFile.type,
      });
      this.selectedFile = renamedFile;

      //upload the file
      this.fileUploadService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          this.uploadStatus = 'File uploaded successfully!';
          this.resetPage();
          this.refresh();          
        },
        error: (error: HttpErrorResponse) => {
          this.uploadStatus = `Error: ${error.message}`;
        },
      });
      
    } else {
      this.uploadStatus = 'Please select a file first.';
    }
  }

  // Function to extract the file extension
  getFileExtension(filename: string): string {
    const ext = filename.split('.').pop();
    return ext ? '.' + ext : '';
  }

  resetPage() {
    this.selectedFile = null;
    this.doctype = '';
  }

  verifyUploadLimit(){
    if(this.uploadLimit.horoscopeUploadCount ===1 && this.uploadLimit.profile1UploadCount===1 && this.uploadLimit.profile2UploadCount===1){
      this.uploadLimitReached =  true;
    }
    console.log(this.uploadLimitReached)
  }

  refresh() {
    this.fileUploadService.getFilesList(this.profileCode).subscribe((res) => {
      this.files = res.files;
      this.files.forEach((file) => {
        if (file.indexOf('Horoscope') >= 0) {
          this.uploadLimit.horoscopeUploadCount++;
        }
        if (file.indexOf('Profile1') >= 0) {
          this.uploadLimit.profile1UploadCount++;
        }
        if (file.indexOf('Profile2') >= 0) {
          this.uploadLimit.profile2UploadCount++;
        }
      });
      console.log(this.uploadLimit)
      this.uploadTypes[0].hidden = this.uploadLimit.horoscopeUploadCount>0
      this.uploadTypes[1].hidden = this.uploadLimit.profile1UploadCount>0
      this.uploadTypes[2].hidden = this.uploadLimit.profile2UploadCount>0
      this.verifyUploadLimit();
    });
  }

  viewImage(file: string) {
    this.fileUploadService.getFile(file).subscribe((res) => {
      const imageurl = URL.createObjectURL(res);

      const dialogRef = this.dialog.open(PhotoViewerComponent, {
        width: '500px',
        data: imageurl,
      });

      dialogRef.afterClosed().subscribe((data) => {});
    });
  }
}
