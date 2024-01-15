import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../models/pagination.model";
import {SubjectDto} from "../models/dtos/subject.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getSubjects(body: Pagination) {
    return this.http.post<any>(`${environment.domain}/SUBJECT/pagination`, body);
  }

  getAllSubjects() {
    return this.http.get(`${environment.domain}/SUBJECT/all`);
  }

  addSubject(subjectDto: SubjectDto) {
    return this.http
      .post(`${environment.domain}/SUBJECT/add`, subjectDto)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      )
  }

  deleteSubject(subjectId: number) {
    return this.http
      .delete(`${environment.domain}/SUBJECT/${subjectId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
