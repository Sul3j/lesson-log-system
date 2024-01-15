import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../models/pagination.model";
import {ClassroomDto} from "../models/dtos/classroom.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  private _refreshNedeed = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNedeed;
  }

  getClassrooms(body: Pagination) {
    return this.http.post<any>(`${environment.domain}/CLASSROOM/pagination`, body);
  }

  getAllClassrooms() {
    return this.http.get(`${environment.domain}/CLASSROOM/all`);
  }

  addClassroom(classroomDto: ClassroomDto) {
    return this.http
      .post(`${environment.domain}/CLASSROOM/add`, classroomDto)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }

  deleteClassroom(classroomId: number) {
    return this.http
      .delete(`${environment.domain}/CLASSROOM/${classroomId}`)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }
}
