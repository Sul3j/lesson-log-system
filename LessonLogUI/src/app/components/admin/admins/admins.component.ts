import {Component, ElementRef, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AdminsService} from "../../../services/admins.service";
import {Pagination} from "../../../models/pagination.model";
import {ResponseModel} from "../../../models/response.model";
import {Admin} from "../../../models/admin.model";
import {UsersService} from "../../../services/users.service";
import {HelperService} from "../../../services/helper.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {
  public admins: Array<Admin> = new Array<Admin>();
  public users: Array<User> = new Array<User>();
  public selectedUser!: number;
  public paginationModel: Pagination = new Pagination();
  public search: string = "";
  public items: number = 5;
  public response: ResponseModel<Admin> = new ResponseModel<Admin>();

  constructor(private adminsService: AdminsService,
              private toastr: ToastrService,
              private usersService: UsersService,
              private helperService: HelperService) {}

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
    this.adminsService.getAdmins(this.paginationModel).subscribe(res => {
        this.admins = res.items;
        this.response = this.helperService.mapResponse<Admin>(res);
      }
    );
  }

  searchAdmin(e: any) {
    this.paginationModel = this.helperService.setPaginationFilter(e);
    this.getAllAdmins();
  }

  private getAllUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  changeUser(e: any) {
    this.selectedUser = e.target.value;
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllAdmins();
  }

  addAdmin() {
    this.adminsService.addAdmin(this.selectedUser).subscribe({
      next: (res) => {
        this.toastr.success("Admin has been added!", "Success");
      }, error: () => {
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

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllAdmins();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllAdmins();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllAdmins();
  }

  createRange(number: number){
    return this.helperService.createRange(number);
  }
}

