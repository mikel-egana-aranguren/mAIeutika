// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  login() {
    this.authenticationService.login(this.username, this.password).subscribe(
      (response: boolean) => {
        if (response) {
          this.router.navigate(['/']);
        } else {
          //add alert to html page
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
