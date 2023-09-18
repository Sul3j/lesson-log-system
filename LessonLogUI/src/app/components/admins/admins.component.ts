import {Component, ElementRef, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AdminsService} from "../../services/admins.service";
import {AdminPagination} from "../../models/admin-pagination.model";
import {AdminResponse} from "../../models/admin-response.model";

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
  public response: AdminResponse = new AdminResponse();

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
        this.response = {
          items: res.items,
          totalPages: res.totalPages,
          itemsFrom: res.itemsFrom,
          itemsTo: res.itemsTo,
          totalItemsCount: res.totalItemsCount
        };
      }
    );
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

  clickSelect(select: any) {
    select.OnClick;
    console.log(select);
  }

  changePage(e: any) {
    const pageNumber = parseInt(e.target.value);
    this.defaultPaginationModel.page = pageNumber;
    this.getAllAdmins();
  }

  nextPage(): void {
    const totalPages = this.response.totalPages;
    let pageNumber = this.defaultPaginationModel.page;
    if(totalPages > pageNumber) {
      pageNumber++;
    }
    this.defaultPaginationModel.page = pageNumber;
    this.getAllAdmins();
  }

  previousPage(): void {
    let pageNumber = this.defaultPaginationModel.page;
    if(pageNumber > 0) {
      pageNumber--;
    }
    this.defaultPaginationModel.page = pageNumber;
    this.getAllAdmins();
  }

  createRange(number: number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}

