import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  avatarLink = '';

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.avatarLink =
    `https://ui-avatars.com/api/?name=${authenticationService.profile.firstName}+${authenticationService.profile.lastName}`;
  }

  ngOnInit() {
  }

  /**
   * Logout of of the application and redirect to login page
   * @param $event event
   */
  signout($event) {
    $event.preventDefault();
    this.authenticationService.logout();
  }

}
