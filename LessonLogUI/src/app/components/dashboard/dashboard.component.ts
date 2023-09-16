import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../services/api.service";
import {UserDataService} from "../../services/user-data.service";
import {RoutesNames} from "../../models/routes-names.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public fullName: string = "";
  public currentPage: RoutesNames = RoutesNames.ADMIN;
  public RoutesNames = RoutesNames;

  constructor(private auth: AuthService, private toastr: ToastrService, private api: ApiService, private userData: UserDataService) {}

  logout() {
    this.auth.logout();
    this.toastr.success("Logged out!", "Success");
  }

  ngOnInit(): void {
    this.api.getUsers().subscribe(res => {
      this.users = res;
    });

    this.userData.getFullName()
      .subscribe(val => {
        let tokenFullName = this.auth.getFullNameFromToken();
        this.fullName = val || tokenFullName;
      })
  }

  toggleMenu() {
    const menu = document.querySelector(".menu");
    menu?.classList.toggle("menu-active");
  }

  changeCurrentPage(current: RoutesNames) {
    this.currentPage = current;
  }
}
