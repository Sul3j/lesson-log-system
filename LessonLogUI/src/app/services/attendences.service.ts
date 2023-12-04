import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {AttendaceDto} from "../models/attendace.dto";
import {AttendanceEditDto} from "../models/attendance.edit.dto";

@Injectable({
  providedIn: 'root'
})
export class AttendencesService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  addAttendance(attendanceDto: AttendaceDto) {
    return this.http
      .post(`${this.urlService.url}/ATTENDANCE/add`, attendanceDto)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  getAttendancesByLessonId(lessonId: number) {
    return this.http.get(`${this.urlService.url}/ATTENDANCE/${lessonId}`);
  }

  updateAttendance(attendance: AttendanceEditDto) {
    console.log(attendance);
    return this.http
      .put(`${this.urlService.url}/ATTENDANCE/edit/${attendance.id}`, attendance)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
