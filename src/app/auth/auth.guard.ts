import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = !!this.authService.getToken();
    if(!isAuth) {
      this.router.navigate(['/login']);
    }
    console.log('Auth guard works! - isAuth?', isAuth);

    return isAuth;
  }
}
