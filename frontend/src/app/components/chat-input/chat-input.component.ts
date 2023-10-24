import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  // Component references
  //@ViewChild(ChatContentComponent) chatContent!: ChatContentComponent;
  // Atributes
  //@Input({required: true}) prompt!: {"role": string, "content": string};
  prompt!: string;
  // Events
  //@Output() messageSent = new EventEmitter<{"role": string, "content": string}>();

  constructor(private chatService: ChatService) {}

  /*sendMessage(prompt: {"role": string, "content": string}) {
    this.chatService.sendMessage(prompt);
  }*/
  sendMessage(prompt: string) {
    this.chatService.sendMessage(prompt);
  }
}
