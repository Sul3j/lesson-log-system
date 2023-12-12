import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";
import {ClassroomDto} from "../models/dtos/classroom.dto";

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  private _refreshNedeed = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNedeed;
  }

  getClassrooms(body: Pagination) {
    return this.http.post<any>(`${this.urlService.url}/CLASSROOM/pagination`, body);
  }

  getAllClassrooms() {
    return this.http.get(`${this.urlService.url}/CLASSROOM/all`);
  }

  addClassroom(classroomDto: ClassroomDto) {
    return this.http
      .post(`${this.urlService.url}/CLASSROOM/add`, classroomDto)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }

  deleteClassroom(classroomId: number) {
    return this.http
      .delete(`${this.urlService.url}/CLASSROOM/${classroomId}`)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }
}
