import { Component } from '@angular/core';
import { forgot_password } from './forgot-password';
import { ForgotPasswordComponentApiService } from './forgot-password.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  credentials: forgot_password = {
    userName: '',
    email: ''
  };
  errorMessage: string = '';

  constructor(private apiService: ForgotPasswordComponentApiService) { }

  onSubmit() {
    this.apiService.forgotPassword(this.credentials).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
