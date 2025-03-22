import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(environment.localUrl + 'uploadImage', formData, {
      headers: new HttpHeaders(),
    });
  }
  public getFilesList(profileCode:string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.localUrl + 'getFileList?filter='+profileCode, {
      headers: headers,
    });
  }

  public getFile(fileName: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.localUrl + 'uploads/' + fileName, {
      responseType: 'blob',
    });
  }
}
