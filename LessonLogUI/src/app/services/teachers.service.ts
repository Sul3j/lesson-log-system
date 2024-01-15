import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../models/pagination.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getTeachers(body: Pagination) {
    return this.http.post<any>(`${environment.domain}/TEACHER/pagination`, body);
  }

  addTeacher(userId: number) {
    return this.http
      .post(`${environment.domain}/TEACHER/add`, { "userId": userId })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  getAllTeachers() {
    return this.http.get(`${environment.domain}/TEACHER/all`);
  }

  deleteTeacher(teacherId: number) {
    return this.http
      .delete(`${environment.domain}/TEACHER/${teacherId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  getTeacherId(email: string) {
    return this.http.get(`${environment.domain}/TEACHER/email/${email}`);
  }
}
