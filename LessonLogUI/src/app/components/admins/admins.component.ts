import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AdminsService} from "../../services/admins.service";
import {AdminPagination} from "../../models/admin-pagination.model";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {
  public admins: any = [];
  public users: any = [];
  public selectedUser!: number;
  public defaultPaginationModel: AdminPagination = new AdminPagination();
  public search: string = "";
  public items: number = 5;

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
    this.adminsService.getAdmins(this.defaultPaginationModel).subscribe(res => {
      this.admins = res.items;
    });
  }

  searchAdmin(e: any) {
    this.defaultPaginationModel.filters = `(userFirstName|userLastName)@=*${e.target.value}`;
    this.getAllAdmins();
  }

  private getAllUsers() {
    this.adminsService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  changeUser(e: any) {
    this.selectedUser = e.target.value;
  }

  itemsPerPage(e: any) {
    this.items = parseInt(e.target.value);
    this.defaultPaginationModel.pageSize = this.items;
    this.getAllAdmins();
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

