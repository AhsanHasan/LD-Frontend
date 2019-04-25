import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private LOGIN_ENDPOINT = '/login';
  private AUTHENTICATED_ENDPOINT = '/check-auth';
  private GETPROFILE_ENDPOINT = '/get-profile';

  public profile: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Login user with credentials
   * @param body object
   */
  public async login(body) {
    const response = await this.http.post(environment.apiBase + this.LOGIN_ENDPOINT, body).toPromise() as any;
    this.loginWithToken(response.data.token);
  }

  /**
   * Set token in local storage, get profile and navigate to dashboard
   * @param token string
   */
  private async loginWithToken(token) {
    localStorage.setItem('token', token);
    this.router.navigate(['/']);
  }

  /**
   * Get profile of the user
   */
   public async getProfile() {
    if (localStorage.getItem('token') == null) { return false; } else {
      try {
        const query = {
          token: localStorage.getItem('token')
        };
        const response = await this.http.get(environment.apiBase + this.GETPROFILE_ENDPOINT, {params: query}).toPromise() as any;
        this.profile = response.data.user;
      } catch (error) {
        return false;
      }
    }
   }

   /**
    * check if user is authenticated and the token is valid
    */
  public async isAuthenticated() {
    if (localStorage.getItem('token') == null) { return false; } else {
      try {
        const query = {
          token: localStorage.getItem('token')
        };
        const response = await this.http.get(environment.apiBase + this.AUTHENTICATED_ENDPOINT, {params: query}).toPromise() as any;
        const authenticated = response.data.authenticated;
        if (authenticated) { await this.getProfile(); }
        return response.data.authenticated;
      } catch (error) {
        return false;
      }
    }
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
