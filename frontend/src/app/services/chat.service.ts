import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //private messageSource = new BehaviorSubject<{"role": string, "content": string}>({"role": "", "content": ""});
  private messageSource = new BehaviorSubject<any>(null);
  message$ = this.messageSource.asObservable();

  constructor() {}

  sendMessage(message: string) {
    this.messageSource.next(message);
  }
}
