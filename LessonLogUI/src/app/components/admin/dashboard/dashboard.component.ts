import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {UsersService} from "../../../services/users.service";
import {DashboardCount} from "../../../models/users-count.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public fullName: string = "";
  public count: DashboardCount = new DashboardCount();

  constructor(private auth: AuthService, private toastr: ToastrService, private usersService: UsersService) {}

  logout() {
    this.auth.logout();
    this.toastr.success("Logged out!", "Success");
  }

  ngOnInit(): void {
    this.usersService.getAllExistingUsers().subscribe(res => {
      this.users = res;

      res.forEach((e: any) => {
        this.count.users++;
        switch (e.role) {
          case 'TEACHER':
          {
            this.count.teachers++;
            break;
          }
          case 'ADMIN':
          {
            this.count.admins++;
            break;
          }
          case 'STUDENT':
          {
            this.count.students++;
            break;
          }
          case 'TUTOR':
          {
            this.count.tutors++;
            break;
          }
          default:
            break;
        }
      })
    });
  }
}
