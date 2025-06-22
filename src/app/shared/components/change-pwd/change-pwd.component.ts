import { Component } from '@angular/core';
import { ChangePwdService } from './change-pwd.service';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss'],
})
export class ChangePwdComponent {
  credentials: ChangePwd = {
    subscriber_id: JSON.parse(localStorage.getItem('user') || '{}').subscriber_id,    
    newPwd: '',
  };
  acceptTC = false;
  errorMessage: string = '';

  constructor(
    private changePassword: ChangePwdService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onSubmit() {
    this.credentials.subscriber_id =
      this.credentials.subscriber_id.toUpperCase();
    if (
      JSON.parse(localStorage.getItem('user') || '{}').subscriber_id ===
      this.credentials.subscriber_id
    ) {
      this.changePassword.changePwd(this.credentials).subscribe(
        (res) => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: 'Password Change Successful',
          });

          dialogRef.afterClosed().subscribe((data) => {
            this.router.navigate(['/home']);
          });
        },
        (error) => {
          this.errorMessage = error.error.error;
        }
      );
    } else {
      this.errorMessage = "Invalid Subscriber Id"
    }
  }
}

export interface ChangePwd {
  subscriber_id: string;
  currentPwd?: string;
  newPwd: string;
}
