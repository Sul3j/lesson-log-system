import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherLessonsService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient,
              private urlService: UrlService) {}

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getTeacherId(email: string) {
    return this.http.get(`${this.urlService.url}/TEACHER/email/${email}`);
  }

  getLessons(body: Pagination, teacherId: number, classId: number, subjectId: number) {
    return this.http.post<any>(`${this.urlService.url}/LESSON/${teacherId}/${classId}/${subjectId}`, body);
  }
}
