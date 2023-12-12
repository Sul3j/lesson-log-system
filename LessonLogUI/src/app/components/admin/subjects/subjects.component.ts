import {Component, OnInit} from '@angular/core';
import {SubjectsService} from "../../../services/subjects.service";
import {HelperService} from "../../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import {Pagination} from "../../../models/pagination.model";
import {ResponseModel} from "../../../models/response.model";
import {Subject} from "../../../models/subject.model";
import {SubjectDto} from "../../../models/dtos/subject.dto";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Subject> = new ResponseModel<Subject>();
  public subjects: Array<Subject> = new Array<Subject>();
  public subjectValue: SubjectDto = new SubjectDto();

  constructor(private subjectService: SubjectsService,
                private helperService: HelperService,
                private toastr: ToastrService) {}

  ngOnInit(): void {
    this.subjectService.refreshNeeded
      .subscribe(() => {
        this.getAllSubjects();
      })
    this.getAllSubjects();
  }

  private getAllSubjects() {
    this.subjectService.getSubjects(this.paginationModel).subscribe(res => {
      this.subjects = res.items;
      this.response = this.helperService.mapResponse<Subject>(res);
    })
  }

  searchSubject(e: any) {
    this.paginationModel = this.helperService.setSubjectPaginationFilter(e);
    this.getAllSubjects();
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllSubjects();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllSubjects();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllSubjects();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllSubjects();
  }

  deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe({
      next: () => {
        this.toastr.success("Subject has been deleted!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error")
      }
    })
  }

  addSubject() {
    this.subjectService.addSubject(this.subjectValue).subscribe({
      next: () => {
        this.toastr.success("Subject has been added!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
    this.subjectValue.name = "";
  }

  isAllSubjectValue() {
    if(this.subjectValue.name != "") {
      return false;
    } else {
      return true;
    }
  }

}
