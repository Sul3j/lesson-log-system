import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: any = [];

  constructor(private auth: AuthService, private toastr: ToastrService, private api: ApiService) {}

  logout() {
    this.auth.logout();
    this.toastr.success('Logged out!')
  }

  ngOnInit(): void {
    this.api.getUsers().subscribe(res => {
      this.users = res;
    })
  }
}
