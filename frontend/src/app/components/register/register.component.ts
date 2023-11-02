import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  register() {
    this.authenticationService.register(this.username, this.password).subscribe(
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
