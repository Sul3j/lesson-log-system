import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getTeachers(body: Pagination) {
    return this.http.post<any>(`${this.urlService.url}/TEACHER/pagination`, body);
  }

  addTeacher(userId: number) {
    return this.http
      .post(`${this.urlService.url}/TEACHER/add`, { "userId": userId })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  getAllTeachers() {
    return this.http.get(`${this.urlService.url}/TEACHER/all`);
  }

  deleteTeacher(teacherId: number) {
    return this.http
      .delete(`${this.urlService.url}/TEACHER/${teacherId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  getTeacherId(email: string) {
    return this.http.get(`${this.urlService.url}/TEACHER/email/${email}`);
  }
}
