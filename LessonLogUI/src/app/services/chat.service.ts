import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {User} from "../models/user.model";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {UsersService} from "./users.service";
import {Message} from "../models/message.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  myUser: User = new User();
  private chatConnection?: HubConnection;
  basicMessages: Message[] = [];
  messagesReverse: Message[] = [];
  private _refreshNeeded = new Subject<void>();
  toUser: number = 0;

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  createChatConnection() {
    this.chatConnection = new HubConnectionBuilder()
      .withUrl(`${this.urlService.urlWithoutApi}/hubs/chat`).withAutomaticReconnect().build();

    this.chatConnection.start().catch(error => {
      console.log(error);
    });

    this.chatConnection.on("UserConnected", () => {
      this.addUserConnectionId();
    });

    this.chatConnection.on("NewMessage", (newMessage: Message) => {
      this.getPrivateMessages(this.myUser.id, this.toUser).subscribe(res => {
        this.basicMessages = res as Array<Message>;
      })
      this.getPrivateMessages(this.toUser, this.myUser.id).subscribe(res => {;
        this.messagesReverse = res as Array<Message>;
      })
    })
  }

  getToUserId(id: number) {
    this.toUser = id;
  }

  getAllMessages() {
    return this.http.get(`${this.urlService.url}/CHAT`);
  }

  getPrivateMessages(from: number, to: number) {
    return this.http.get(`${this.urlService.url}/CHAT/private/${from}/${to}`);
  }

  stopChatConnection() {
    this.chatConnection?.stop().catch(error => console.log(error));
  }

  async addUserConnectionId() {
    return this.chatConnection?.invoke("AddUserConnectionId", this.myUser.id)
      .catch(error => console.log(error));
  }

  async sendMessage(content: string) {
    const message: Message = {
      from: this.myUser.id,
      fromName: `${this.myUser.firstName} ${this.myUser.lastName}`,
      content
    }

    return this.chatConnection?.invoke('ReciveMessage', message);
  }

  async sendPrivateMessage(content: string, toUser: User) {
    const message: Message = {
      from: this.myUser.id,
      fromName: `${this.myUser.firstName} ${this.myUser.lastName}`,
      to: toUser.id,
      toName: `${toUser.firstName} ${toUser.lastName}`,
      content
    }

    return this.chatConnection?.invoke('ReciveMessage', message);
  }
}
