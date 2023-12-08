import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {GradeDto} from "../models/grade.dto";

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


}
