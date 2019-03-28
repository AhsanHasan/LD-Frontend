import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  /**
   * Login the user in the system
   * @param loginForm NgForm
   */
  async login(loginForm: NgForm) {
    try {
      if (loginForm.valid) {
        await this.authenticationService.login(loginForm.value);
      }
    } catch (error) {
      const errorMessage = error.error.message;
      try {
        const formErrors = JSON.parse(error.error.message);
        for (const key in formErrors) {
          if (formErrors.hasOwnProperty(key) && loginForm.controls[key] != null) {
            loginForm.controls[key].setErrors({server: formErrors[key]});
          }
        }
      } catch (error) {
        loginForm.controls.email.setErrors({server: errorMessage});
      }
    }
  }

}
