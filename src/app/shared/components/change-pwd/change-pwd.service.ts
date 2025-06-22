import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePwd } from './change-pwd.component';

@Injectable({
  providedIn: 'root',
})
export class ChangePwdService {
  constructor(private http: HttpClient) {}
  
  

  changePwd(credentials: ChangePwd): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.localUrl + 'changePassword', credentials, {
      headers: headers,
    });
  }
}
