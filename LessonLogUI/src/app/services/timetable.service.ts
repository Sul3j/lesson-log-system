import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {TimetableDto} from "../models/timetable.dto";
import {SubjectsService} from "./subjects.service";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient,
              private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getTimetable(classId: number) {
    return this.http.get(`${this.urlService.url}/TIMETABLELESSON/${classId}`);
  }

  addTimetable(timetable: TimetableDto) {
    return this.http.post(`${this.urlService.url}/TIMETABLELESSON/add`, timetable)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteLesson(id: number) {
    return this.http.delete(`${this.urlService.url}/TIMETABLELESSON/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  editLesson(id: number, lesson: TimetableDto) {
    return this.http.put(`${this.urlService.url}/TIMETABLELESSON/edit/${id}`, lesson)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
