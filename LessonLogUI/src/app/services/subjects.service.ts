import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";
import {SubjectDto} from "../models/subject.dto";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private _refreshNedeed = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNedeed;
  }

  getSubjects(body: Pagination) {
    return this.http.post<any>(`${this.urlService.url}/SUBJECT/pagination`, body);
  }

  getAllSubjects() {
    return this.http.get(`${this.urlService.url}/SUBJECT/all`);
  }

  addSubject(subjectDto: SubjectDto) {
    return this.http
      .post(`${this.urlService.url}/SUBJECT/add`, subjectDto)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      )
  }

  deleteSubject(subjectId: number) {
    return this.http
      .delete(`${this.urlService.url}/SUBJECT/${subjectId}`)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      )
  }
}
