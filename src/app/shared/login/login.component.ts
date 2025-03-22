import { Component } from '@angular/core';
import { LoginApiService } from './login.service';
import { login } from './login';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials: login = {
    username: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(
    private apiService: LoginApiService,
    private dialog: MatDialog,
    private router: Router,
    private as: AppService,
    private auth:AuthService
  ) {}

  onSubmit() {
    this.apiService.login(this.credentials).subscribe(
      (response) => {
        if(response.message){
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: 'Login Failure',
          });
          dialogRef.afterClosed().subscribe((data) => {           
            this.credentials.username = "";
            this.credentials.password = "";
          });
        } else {
          this.auth.login(response); //store the user object under auth service
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: 'Login Successful',
          });
  
          dialogRef.afterClosed().subscribe((data) => {
            this.as.setLogin(true);
            this.router.navigate(['/home']);
          });
          
        }
        
      },
      (error) => {
        this.errorMessage = error.error.error;
      }
    );
  }
}
