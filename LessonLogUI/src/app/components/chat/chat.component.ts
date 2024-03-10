import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {User} from "../../models/user.model";
import {UsersService} from "../../services/users.service";
import {MessagesComponent} from "./messages/messages.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild(MessagesComponent) messagesComponent: MessagesComponent | undefined;

  public users: Array<User> = new Array<User>();
  public search: string = "";
  public to: User = new User();

  constructor(public chatService: ChatService, private userService: UsersService, private toastr: ToastrService) {}

  ngOnInit() {
    this.chatService.createChatConnection();
    this.getUsers();
  }

  ngOnDestroy() {
    this.chatService.stopChatConnection();
    this.messagesComponent?.basicMessages.splice(0, this.messagesComponent?.basicMessages.length);
    this.messagesComponent?.messagesReverse.splice(0, this.messagesComponent?.messagesReverse.length);
  }

  getUsers(search: string = "") {
    search = search.toLowerCase();
    this.userService.getAllExistingUsers().subscribe(res => {
      this.users = res;
      if (search != "") {
        this.users = this.users.filter( user => user.firstName.toLowerCase().includes(search) || user.lastName.toLowerCase().includes(search));
      }
    })
  }

  getFilteredUsers(users: Array<User>) {
    return users.filter((user) => user.id !== this.chatService.myUser.id);
  }

  sendMessage(content: string) {
    if (this.to) {
      this.chatService.sendPrivateMessage(content, this.to);
      this.messagesComponent?.getPrivateMessages(this.chatService.myUser.id, this.to.id);
    }
  }

  getCurrentUser(user: User) {
    this.to = user;
    this.chatService.getToUserId(user.id);
    this.messagesComponent?.getPrivateMessages(this.chatService.myUser.id, user.id);
  }
}

