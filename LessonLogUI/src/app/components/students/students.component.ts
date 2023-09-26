import {Component, OnInit} from '@angular/core';
import {Student} from "../../models/student.model";
import {User} from "../../models/user.model";
import {Pagination} from "../../models/pagination.model";
import {ResponseModel} from "../../models/response.model";
import {StudentsService} from "../../services/students.service";
import {HelperService} from "../../services/helper.service";
import {UsersService} from "../../services/users.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  public students: Array<Student> = new Array<Student>();
  public users: Array<User> = new Array<User>();
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Student> = new ResponseModel<Student>();
  public items: number = 5;
  public selectedUser!: number;

  constructor(private studentsService: StudentsService,
              private helperService: HelperService,
              private usersService: UsersService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.studentsService.refreshNeeded
      .subscribe(() => {
        this.getAllStudents();
        this.getAllUsers();
      })
    this.getAllStudents();
    this.getAllUsers();
  }

  private getAllStudents() {
    this.studentsService.getStudents(this.paginationModel).subscribe(res => {
      this.students = res.items;
      this.response = this.helperService.mapResponse<Student>(res);
    })
  }

  private getAllUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  searchStudent(e: any) {
    this.helperService.setPaginationFilter(e);
    this.getAllStudents();
  }

  changeUser(e: any) {
    this.selectedUser = e.target.value;
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllStudents();
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllStudents();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllStudents();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllStudents();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }


}
