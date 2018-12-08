import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';
import { Message } from '../../models/message.mode';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  messages: Message[] = []

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.errorOccurred.subscribe((message) => {
      this.displayMessage(message)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayMessage(message) {
    this.messages.push(message)
    console.log(this.messages)
    setTimeout(() => {
      this.messages = this.messages.filter((m) => m !== message)
    }, 10000)
  }

  close(message) {
    this.messages = this.messages.filter((m) => m !== message)
  }

}
