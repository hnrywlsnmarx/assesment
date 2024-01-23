import { CanActivateFn, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedInUser()) {
      this.router.navigate(['']);
      console.log('User not logged in, redirecting to login');
      return true;
    } else {
      console.log('User logged in, redirecting to page');
      this.router.navigate(['/employee']); 
      return true;
    }
  }
}
