import { Component, OnInit } from '@angular/core';
import { RegisterApiService } from './register.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { register } from './register';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  addUser: FormGroup = this.fb.group({
    username: [
      null,
      {
        validators: [Validators.required],
        updateOn: 'change',
      },
    ],
    name: [
      null,
      {
        validators: [Validators.required],
        updateOn: 'change',
      },
    ],
    
    email: [
      null,
      {
        validators: [Validators.required],
        updateOn: 'change',
      },
    ],
    phoneNumber: [
      null,
      {
        validators: [Validators.required],
        updateOn: 'change',
      },
    ],
    password: [
      null,
      {
        validators: [Validators.required],
        updateOn: 'change',
      },
    ],
    confirm_password: [
      null,
      {
        validators: [Validators.required],
        updateOn: 'change',
      },
    ],
  });
  errors = { confirmPassword: '' };

  ngOnInit(): void {
   
  }

  handleSubmit() {
    if (this.addUser?.value.password !== this.addUser?.value.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
      return;
    }
  }
  credentials: register = {
    name:'',
    username: '',
    email: '',
    phoneNumber: 0,
    password: '',
    confirm_password: '',
  };
  errorMessage: string = '';

  constructor(
    private apiService: RegisterApiService,
    private fb: FormBuilder,
    private dialog:MatDialog,
    private router:Router
  ) {}

  onSubmit() {
    //name, email, username, password, phoneNumber,confirm_password
    this.credentials.username = this.addUser.get('username')?.value;
    this.credentials.name = this.addUser.get('name')?.value
    this.credentials.phoneNumber = this.addUser.get('phoneNumber')?.value
    this.credentials.password = this.addUser.get('password')?.value
    this.credentials.confirm_password = this.addUser.get('confirm_password')?.value
    this.credentials.email = this.addUser.get('email')?.value
    
    this.apiService.register(this.credentials).subscribe(
      (response) => {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '500px',
          data: "You will receive an email notification",
        });  
        
        dialogRef.afterClosed().subscribe(data=>{
          this.router.navigate(['/home'])
        })
        
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.message;
      }
    );
    
    
  }
}
function handleSubmit() {
  throw new Error('Function not implemented.');
}
