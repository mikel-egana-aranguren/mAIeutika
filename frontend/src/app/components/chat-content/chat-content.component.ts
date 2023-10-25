import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { HttpClient } from '@angular/common/http';

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
  messages: {"role": string, "content": string}[] = []

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
  constructor(private chatService: ChatService, private httpClient: HttpClient) {
    this.subscription = this.chatService.message$.subscribe(
      (message: string) => {
        this.messages.push({"role": "user", "content": message});
        this.sendPostRequest(message);
      }
    );
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar pérdida de memoria
    this.subscription.unsubscribe();
  }

  private sendPostRequest(message: string): void {
    const apiUrl = 'http://127.0.0.1:8000/pregunta/';
    const requestBody = { "role": 'user', "prompt": message };

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

}
