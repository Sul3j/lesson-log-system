import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../services/api.service";
import {UserDataService} from "../../services/user-data.service";
import {AdminsService} from "../../services/admins.service";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {
  public admins: any = [];
  public users: any = [];
  public selectedUser!: number;

  constructor(private adminsService: AdminsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.adminsService.refreshNeeded
      .subscribe(() => {
        this.getAllAdmins();
        this.getAllUsers();
      });

    this.getAllAdmins();
    this.getAllUsers();
  }

  private getAllAdmins() {
    this.adminsService.getAdmins().subscribe(res => {
      this.admins = res;
    });
  }

  private getAllUsers() {
    this.adminsService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  getAdmins() {
    this.adminsService.getAdmins()
      .subscribe(res => {
        this.admins = res;
    });
  }

  changeUser(e: any) {
    this.selectedUser = e.target.value;
  }

  addAdmin() {
    this.adminsService.addAdmin(this.selectedUser).subscribe({
      next: (res) => {
        this.toastr.success("Admin has been added!", "Success");
      }, error: (err) => {
        this.toastr.error("Something went wrong!", "Error");
      }
    });
  }

  deleteAdmin(id: number) {
    this.adminsService.deleteAdmin(id).subscribe({
      next: (res) => {
        this.toastr.success("Admin has been deleted!", "Success");
      }, error: (err) => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
  }
}

