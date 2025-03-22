import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forgot_password, ResetPasswordResponse } from './forgot-password';
@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordComponentApiService {

    constructor(private http: HttpClient) { }

    forgotPassword(credentials: forgot_password): Observable<ResetPasswordResponse> {
        return this.http.post<ResetPasswordResponse>('http://3.6.184.48:3000/user/reset-password', credentials);
    }
}
