import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(private auth: AuthService, private toastr: ToastrService) {}

  logout() {
    this.auth.logout();
    this.toastr.success("Wylogowano!", "Sukces");
  }
}
