import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Permissions {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    // check if user is logged in
    const loggedIn: boolean = this.auth.isAuthenticatedUser();
    // if not, redirect to /login
    if (!loggedIn) {
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }
}

@Injectable()
export class CanActivateRoute {
  constructor(private permissions: Permissions) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.permissions.canActivate();
  }
}
