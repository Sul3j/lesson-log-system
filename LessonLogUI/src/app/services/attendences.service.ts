import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AttendaceDto} from "../models/dtos/attendace.dto";
import {AttendanceEditDto} from "../models/dtos/attendance.edit.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AttendencesService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  addAttendance(attendanceDto: AttendaceDto) {
    return this.http
      .post(`${environment.domain}/ATTENDANCE/add`, attendanceDto)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  getAttendancesByLessonId(lessonId: number) {
    return this.http.get(`${environment.domain}/ATTENDANCE/${lessonId}`);
  }

  updateAttendance(attendance: AttendanceEditDto) {
    console.log(attendance);
    return this.http
      .put(`${environment.domain}/ATTENDANCE/edit/${attendance.id}`, attendance)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
