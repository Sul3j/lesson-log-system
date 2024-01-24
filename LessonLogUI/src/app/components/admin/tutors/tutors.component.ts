import {Component, OnInit} from '@angular/core';
import {Tutor} from "../../../models/tutor.model";
import {User} from "../../../models/user.model";
import {Pagination} from "../../../models/pagination.model";
import {ResponseModel} from "../../../models/response.model";
import {TutorsService} from "../../../services/tutors.service";
import {HelperService} from "../../../services/helper.service";
import {UsersService} from "../../../services/users.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.scss']
})
export class TutorsComponent implements OnInit {
  public tutors: Array<Tutor> = new Array<Tutor>();
  public users: Array<User> = new Array<User>();
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Tutor> = new ResponseModel<Tutor>();
  public items: number = 5;
  public selectedUser!: number;

  constructor(private tutorsService: TutorsService,
              private helperService: HelperService,
              private usersService: UsersService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.tutorsService.refreshNeeded
      .subscribe(() => {
        this.getAllTutors();
        this.getAllUsers();
      })
    this.getAllTutors();
    this.getAllUsers();
  }

  private getAllTutors() {
    this.tutorsService.getTutors(this.paginationModel).subscribe(res => {
      this.tutors = res.items;
      this.response = this.helperService.mapResponse<Tutor>(res);
    });
  }

  private getAllUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  searchTutor(e: any) {
    this.paginationModel = this.helperService.setPaginationFilter(e);
    this.getAllTutors();
  }

  changeUser(e: any) {
    this.selectedUser = e.target.value;
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllTutors();
  }

  addTutor() {
    this.tutorsService.addTutor(this.selectedUser).subscribe({
      next: () => {
        this.toastr.success("Dodano opiekuna!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
  }

  deleteTutor(id: number) {
    this.tutorsService.deleteTutor(id).subscribe({
      next: () => {
        this.toastr.success("Usunięto opiekuna!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error")
      }
    })
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllTutors();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllTutors();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllTutors();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }

}
