import {Component, OnInit} from '@angular/core';
import {TeachersService} from "../../services/teachers.service";
import {Pagination} from "../../models/pagination.model";
import {Teacher} from "../../models/teacher.model";
import {ResponseModel} from "../../models/response.model";
import {HelperService} from "../../services/helper.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  public teachers: Array<Teacher> = new Array<Teacher>();
  public users: Array<User> = new Array<User>();
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Teacher> = new ResponseModel<Teacher>();
  public items: number = 5;
  public selectedUser!: number;

  constructor(private teachersService: TeachersService,
              public helperService: HelperService,
              private usersService: UsersService,
              private toastr: ToastrService) {}


  ngOnInit(): void {
    this.teachersService.refreshNeeded
      .subscribe(() => {
        this.getAllTeachers();
        this.getAllUsers();
      })
    this.getAllTeachers();
    this.getAllUsers();
  }

  private getAllTeachers() {
    this.teachersService.getTeachers(this.paginationModel).subscribe(res => {
        this.teachers = res.items;
        this.response = this.helperService.mapResponse<Teacher>(res);
      }
    );
  }

  private getAllUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  searchTeacher(e: any) {
    this.helperService.setPaginationFilter(e);
    this.getAllTeachers();
  }

  changeUser(e: any) {
    this.selectedUser = e.target.value;
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllTeachers();
  }

  addTeacher() {
    this.teachersService.addTeacher(this.selectedUser).subscribe({
      next: () => {
        this.toastr.success("Teacher has been added!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
  }

  deleteTeacher(id: number) {
    this.teachersService.deleteTeacher(id).subscribe({
      next: () => {
        this.toastr.success("Teacher has been deleted!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllTeachers();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllTeachers();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllTeachers();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }
}




