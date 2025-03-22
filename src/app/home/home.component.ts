import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})
export class HomeComponent implements OnInit {
  userDetails: any;
  loggedIn = false;
  isAdmin = false;
  constructor(
    private as: AppService,
    private homeServive: HomeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.as.loginObs.subscribe((data) => {
      this.loggedIn = data;
    });
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      if(!isAdmin){
        this.isAdmin = (JSON.parse(localStorage.getItem('user') || '{}').user_type === 'A')
      }else {
        this.isAdmin = isAdmin;
      }
      
    });
    this.userDetails = JSON.parse(localStorage.getItem('user')!);
    if (this.userDetails) {
    }
  }
}
