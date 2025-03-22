import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { register } from './register';

@Injectable({
    providedIn: 'root'
})
export class RegisterApiService {

    constructor(private http: HttpClient) { }

    register(credentials: register): Observable<any> {
        return this.http.post<any>('http://3.6.184.48:3000/user/register', credentials);
    }
}
