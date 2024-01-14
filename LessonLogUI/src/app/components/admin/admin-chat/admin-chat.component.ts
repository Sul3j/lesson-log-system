import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {UsersService} from "../../../services/users.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit {

  constructor(private chatService: ChatService, private userService: UsersService) {
  }

  ngOnInit(): void {
    this.getCurrentUserId();
  }

  getCurrentUserId() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;

    this.userService.getUserByEmail(decodeToken.unique_name).subscribe((res) => {
      this.chatService.myUser = res;
    });
  }
}
