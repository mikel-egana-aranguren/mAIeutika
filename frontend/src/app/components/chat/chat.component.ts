import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(public authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => {
      if (!user || !user.username) {
        this.router.navigate(['/']);
      }
    });
  }
}
