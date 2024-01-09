import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {jwtDecode} from "jwt-decode";
import {UsersService} from "../../../services/users.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: ['./student-chat.component.scss']
})
export class StudentChatComponent implements OnInit {

  constructor(private chatService: ChatService, private userService: UsersService) {}

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
