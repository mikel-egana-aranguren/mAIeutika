import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent {
  private subscription: Subscription = new Subscription();
  messages: {"role": string, "content": string}[] = [
    {"role": "system", "content": "Eres un asistente muy útil."},
    {"role": "user", "content": "Que dia es"},
    {"role": "assistant", "content": "23 de octubre"}
  ];

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
  constructor(private chatService: ChatService) {
    this.subscription = this.chatService.message$.subscribe(
      (message: string) => {
        this.messages.push({"role": "user", "content": message});
      }
    );
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar pérdida de memoria
    this.subscription.unsubscribe();
  }

}
