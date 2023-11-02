import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  @ViewChild('myInput', { static: false }) myInput!: ElementRef;
  // Component references
  //@ViewChild(ChatContentComponent) chatContent!: ChatContentComponent;
  // Atributes
  //@Input({required: true}) prompt!: {"role": string, "content": string};
  prompt!: string;
  // Events
  //@Output() messageSent = new EventEmitter<{"role": string, "content": string}>();

  constructor(private chatService: ChatService,private router: Router) {}

  /*sendMessage(prompt: {"role": string, "content": string}) {
    this.chatService.sendMessage(prompt);
  }*/
  sendMessage(prompt: string) {
    this.chatService.sendMessage(prompt);
    this.prompt = "";
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  onEnterKeyPressed(event: any): void {
    this.sendMessage(event.target.value);
    this.prompt = "";
  }
}
