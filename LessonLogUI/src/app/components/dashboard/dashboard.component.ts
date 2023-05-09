import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private auth: AuthService, private toastr: ToastrService) {}
  logout() {
    this.auth.logout();
    this.toastr.success('Logged out!')
  }
}
