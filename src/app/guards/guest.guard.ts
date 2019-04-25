import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const isLoggedIn = await this.authenticationService.isAuthenticated();
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
      return !isLoggedIn;
  }
}
