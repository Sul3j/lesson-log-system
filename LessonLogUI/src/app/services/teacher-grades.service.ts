import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {GradeDto} from "../models/dtos/grade.dto";
import {GradeEditDto} from "../models/dtos/garde-edit.dto";

@Injectable({
  providedIn: 'root'
})
export class TeacherGradesService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient,
              private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getGrades() {
    return this.http.get(`${this.urlService.url}/GRADE/all`);
  }

  addGrade(dto: GradeDto) {
    return this.http
        .post(`${this.urlService.url}/GRADE/add`, dto)
        .pipe(
          tap(() => {
            this._refreshNeeded.next();
          })
        );
  }

  deleteGrade(gradeId: number) {
    return this.http
        .delete(`${this.urlService.url}/GRADE/${gradeId}`)
        .pipe(
          tap(() => {
            this._refreshNeeded.next();
          })
        );
  }

  editGrade(gradeId: number, gradeDto: GradeEditDto) {
    return this.http
        .put(`${this.urlService.url}/GRADE/edit/${gradeId}`, gradeDto)
        .pipe(
          tap(() => {
            this._refreshNeeded.next();
          })
        );
  }


}
