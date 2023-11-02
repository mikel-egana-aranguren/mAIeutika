import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => {
      if (!user || !user.username) {
        // If currentUser is empty or username is not set, navigate to the login page
        //this.router.navigate(['/login']);
        //console.log(user);
        console.log();
      }
    });
  }
}
