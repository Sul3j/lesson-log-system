import {Component, OnInit} from '@angular/core';
import {ClassroomsService} from "../../services/classrooms.service";
import {HelperService} from "../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import {Pagination} from "../../models/pagination.model";
import {Classroom} from "../../models/classroom.model";
import {ResponseModel} from "../../models/response.model";

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit{
  public classrooms: Array<Classroom> = new Array<Classroom>();
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Classroom> = new ResponseModel<Classroom>();

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
}
