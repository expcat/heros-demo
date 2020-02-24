import { Component, OnInit } from '@angular/core';
import { MessageService } from '@svc/message.service';

@Component({
  selector: 'app-messages',
  styleUrls: ['./messages.component.scss'],
  template: `
    <div *ngIf="messageService.messages.length">
      <h2>{{ title }}</h2>
      <button class="clear" (click)="messageService.clear()">clear</button>
      <div *ngFor="let message of messageService.messages">{{ message }}</div>
    </div>
  `
})
export class MessagesComponent implements OnInit {
  title = '消息';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}
}
