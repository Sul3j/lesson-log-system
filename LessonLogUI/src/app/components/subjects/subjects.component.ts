import {Component, OnInit} from '@angular/core';
import {SubjectsService} from "../../services/subjects.service";
import {HelperService} from "../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import {Pagination} from "../../models/pagination.model";
import {ResponseModel} from "../../models/response.model";
import {Subject} from "../../models/subject.model";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Subject> = new ResponseModel<Subject>();
  public subjects: Array<Subject> = new Array<Subject>();

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


}
