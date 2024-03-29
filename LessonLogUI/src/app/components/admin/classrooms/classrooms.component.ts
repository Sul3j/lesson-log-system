import {Component, OnInit} from '@angular/core';
import {ClassroomsService} from "../../../services/classrooms.service";
import {HelperService} from "../../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import {Pagination} from "../../../models/pagination.model";
import {Classroom} from "../../../models/classroom.model";
import {ResponseModel} from "../../../models/response.model";
import {ClassroomDto} from "../../../models/dtos/classroom.dto";

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit{
  public classrooms: Array<Classroom> = new Array<Classroom>();
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Classroom> = new ResponseModel<Classroom>();
  public classroomValue: ClassroomDto = new ClassroomDto();

  constructor(private classroomService: ClassroomsService,
              private helperService: HelperService,
              private toastr: ToastrService) {}

  private getAllClassrooms() {
    this.classroomService.getClassrooms(this.paginationModel).subscribe(res => {
      this.classrooms = res.items;
      this.response = this.helperService.mapResponse<Classroom>(res);
    })
  }

  ngOnInit(): void {
    this.classroomService.refreshNeeded
      .subscribe(() => {
        this.getAllClassrooms();
      })
    this.getAllClassrooms();
  }

  deleteClassroom(id: number) {
    this.classroomService.deleteClassroom(id).subscribe({
      next: () => {
        this.toastr.success("Usunięto salę lekcyjną!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error")
      }
    })
  }

  addClassroom() {
    this.classroomService.addClassroom(this.classroomValue).subscribe({
      next: () => {
        this.toastr.success("Dodano salę lekcyjną!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
    this.classroomValue.name = "";
    this.classroomValue.floor = 0;
    this.classroomValue.number = 0;
  }


  isAllClassroomValue() {
    if(this.classroomValue.number > 0 && this.classroomValue.floor > 0 && this.classroomValue.name.length >= 2) {
      return false;
    } else {
      return true;
    }
  }

  searchClassroom(e: any) {
    this.paginationModel = this.helperService.setClassroomPaginationFilter(e);
    this.getAllClassrooms();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllClassrooms();
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllClassrooms();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllClassrooms();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllClassrooms();
  }
}
