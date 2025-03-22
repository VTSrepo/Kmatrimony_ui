import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'kkkr_ui';
  constructor(private as:AppService, private router:Router, private authService:AuthService){
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe(event => {
      this.authService.previousUrl = this.authService.currenUrl;
      this.authService.currenUrl = event.url;     
      // "event" here is now of type "NavigationEnd"
    });

  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('user')?true:false;
    this.as.setLogin(isLoggedIn);
  }
}
