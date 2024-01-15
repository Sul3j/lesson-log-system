import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TimetableDto} from "../models/dtos/timetable.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getTimetable(classId: number) {
    return this.http.get(`${environment.domain}/TIMETABLELESSON/${classId}`);
  }

  addTimetable(timetable: TimetableDto) {
    return this.http.post(`${environment.domain}/TIMETABLELESSON/add`, timetable)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteLesson(id: number) {
    return this.http.delete(`${environment.domain}/TIMETABLELESSON/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  editLesson(id: number, lesson: TimetableDto) {
    return this.http.put(`${environment.domain}/TIMETABLELESSON/edit/${id}`, lesson)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
