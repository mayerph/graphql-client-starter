import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message.mode';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  errorOccurred = new Subject();
  constructor() { }

  displayMessage(message: Message) {
    this.errorOccurred.next(message)
  }

  createMessage(err): void {
    this.displayMessage({
      level: 'error',
      title: 'Error',
      message: err.message || 'server error. please try again'
    })
  }
}
