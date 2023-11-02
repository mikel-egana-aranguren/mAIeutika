import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent {
  private subscription: Subscription = new Subscription();
  /*messages: {"role": string, "content": string}[] = [
    {"role": "system", "content": "Eres un asistente muy útil."},
    {"role": "user", "content": "Que dia es"},
    {"role": "assistant", "content": "23 de octubre"}
  ];*/
  actualUser!: User;
  messages: {"role": string, "content": string}[] = [];

  /*constructor(private chatService: ChatService) {
    this.subscription = this.chatService.message$.subscribe(
      (message: {"role": string, "content": string}) => {
        if (typeof message === 'string') {
          message = JSON.parse(message);
          this.messages.push(message);
        }
      }
    );
  }*/
  constructor(private chatService: ChatService, private httpClient: HttpClient, public authenticationService: AuthenticationService) {
    this.subscription = this.chatService.message$.subscribe(
      (message: string) => {
        if (message !== null) {
          console.log(message)
          this.messages.push({"role": "user", "content": message});
          this.sendPostRequest(message);
        }
      }
    );
    this.authenticationService.currentUser.subscribe(user => {
      if (!user || !user.username) {
        // If currentUser is empty or username is not set, navigate to the login page
        //this.router.navigate(['/login']);
        //console.log(user);
        console.log();
      } else {
        this.actualUser = user;
      }
    });
  }

  ngOnInit() {
    const apiUrl = 'http://127.0.0.1:8000/messages/'

    this.httpClient.get(apiUrl + this.actualUser.username).subscribe(
      (data: any) => {
        //this.messages = data;
        // Filter messages where role is not 'system'
        this.messages = data.filter((message: {"role": string, "content": string}) => message.role !== 'system');
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar pérdida de memoria
    this.subscription.unsubscribe();
  }

  private sendPostRequest(message: string): void {
    const apiUrl = 'http://127.0.0.1:8000/pregunta/';
    //const requestBody = { "role": 'user', "prompt": message };
    const requestBody = {"prompt": message, "username": this.actualUser.username};

    this.httpClient.post(apiUrl, requestBody).subscribe(
      (response) => {
        console.log('POST request successful:', typeof(response));
        if (typeof(response) === "string") {
          this.messages.push({"role": "assistant", "content": response});
        }
        // Handle the response if needed
      },
      (error) => {
        console.error('Error during POST request:', error);
        // Handle errors if needed
      }
    );
  }

  /*sendPostRequest(data: any): Observable<any> {
     return this.httpClient.post<any>(YOUR-SERVER-URL, data);
  }*/
  
  /*sendPostRequest(data).subscribe(
      res => {
        console.log(res);
      }
  );*/

}
