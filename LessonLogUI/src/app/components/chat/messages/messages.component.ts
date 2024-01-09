import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../models/message.model";
import {ChatService} from "../../../services/chat.service";
import {User} from "../../../models/user.model";
import {SortMessage} from "../../../models/sort-message.model";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Input() basicMessages: Message[] = [];
  @Input() messagesReverse: Message[] = [];
  @Input() to: User = new User();
  @Input() from: User = new User();

  constructor(private chatService: ChatService) {}

  getAllMessages() {
    this.chatService.getAllMessages().subscribe(res => {
      this.basicMessages = res as Array<Message>;
    })
  }

  getPrivateMessages(from: number, to: number) {
    this.chatService.getPrivateMessages(from, to).subscribe(res => {
      this.basicMessages = res as Array<Message>;
    })

    this.chatService.getPrivateMessages(to, from).subscribe(res => {
      this.messagesReverse = res as Array<Message>;
    })
  }

  concatMessages(arr1: Message[], arr2: Message[]) {
    arr1.concat(arr2);

    // @ts-ignore
    return [...arr1, ...arr2].sort((a: Message, b: Message) => { return a.id - b.id });
  }

  ngOnInit(): void {
    // this.chatService.refreshNeeded
    //   .subscribe(() => {
    //     this.getPrivateMessages(this.from.id, this.to.id);
    //   })
  }

}
