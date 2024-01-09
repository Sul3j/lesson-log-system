import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {User} from "../../models/user.model";
import {UsersService} from "../../services/users.service";
import {MessagesComponent} from "./messages/messages.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild(MessagesComponent) messagesComponent: MessagesComponent | undefined;

  public users: Array<User> = new Array<User>();
  public search: string = "";
  public to: User = new User();

  constructor(public chatService: ChatService, private userService: UsersService) {}

  ngOnInit() {
    this.chatService.createChatConnection();
    this.getUsers();
  }

  getUsers(search: string = "") {
    this.userService.getAllExistingUsers().subscribe(res => {
      this.users = res;
      if (search != "") {
        this.users = this.users.filter( user => user.firstName.includes(search) || user.lastName.includes(search));
      }
    })
  }

  getFilteredUsers(users: Array<User>) {
    return users.filter((user) => user.id !== this.chatService.myUser.id);
  }

  sendMessage(content: string) {
    // if(!this.to) {
    //   this.chatService.sendMessage(content);
    // }
    if (this.to) {
      this.chatService.sendPrivateMessage(content, this.to);
      console.log(this.to.id)
      this.messagesComponent?.getPrivateMessages(this.chatService.myUser.id, this.to.id);
    }
  }

  getCurrentUser(user: User) {
    console.log(user.id)
    this.to = user;
    this.chatService.getToUserId(user.id);
    this.messagesComponent?.getPrivateMessages(this.chatService.myUser.id, user.id);
  }
}

