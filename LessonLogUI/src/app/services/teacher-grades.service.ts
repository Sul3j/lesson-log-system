import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GradeDto} from "../models/dtos/grade.dto";
import {GradeEditDto} from "../models/dtos/garde-edit.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherGradesService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getGrades() {
    return this.http.get(`${environment.domain}/GRADE/all`);
  }

  addGrade(dto: GradeDto) {
    return this.http
        .post(`${environment.domain}/GRADE/add`, dto)
        .pipe(
          tap(() => {
            this._refreshNeeded.next();
          })
        );
  }

  deleteGrade(gradeId: number) {
    return this.http
        .delete(`${environment.domain}/GRADE/${gradeId}`)
        .pipe(
          tap(() => {
            this._refreshNeeded.next();
          })
        );
  }

  editGrade(gradeId: number, gradeDto: GradeEditDto) {
    return this.http
        .put(`${environment.domain}/GRADE/edit/${gradeId}`, gradeDto)
        .pipe(
          tap(() => {
            this._refreshNeeded.next();
          })
        );
  }


}
