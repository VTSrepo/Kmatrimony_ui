import { Component, OnInit, signal } from '@angular/core';
import { LoginApiService } from '../login/login.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [],
})
export class HeaderComponent implements OnInit {
  showHeader = true;
  loggedIn = false;
  user: any;
  cartCount = 0;
  isAdmin = false;
  constructor(
    private as: AppService,
    private loginService: LoginApiService,
    private router: Router,
    private auth: AuthService
  ) {
    this.as.loginObs.subscribe((data) => {
      this.loggedIn = data;
    });
  }
  ngOnInit() {
  this.isAdmin = JSON.parse(localStorage.getItem('user')|| '{}').user_type === 'A'?true:false;
  console.log(this.isAdmin)  

  }

  logout() {
    // this.loginService.logout().subscribe({
    //   next: () => {
    //     this.loggedIn = false;
    //     this.auth.logout();
    //     this.as.setLogin(false);
    //     this.as.setCartCount(0);
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.router.navigate(['/home'])
    //   },
    // });
    this.loggedIn = false;
    this.auth.logout();
    this.as.setLogin(false);
    this.router.navigate(['/home']);
  }
}
