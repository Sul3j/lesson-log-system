import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../models/pagination.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TutorsService {

  private _refreshNedeed = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNedeed;
  }

  getTutors(body: Pagination) {
    return this.http.post<any>(`${environment.domain}/TUTOR/pagination`, body);
  }

  getAllTutors() {
    return this.http.get(`${environment.domain}/TUTOR/all`);
  }

  addTutor(userId: number) {
    return this.http
      .post(`${environment.domain}/TUTOR/add`, { "userId": userId })
      .pipe(
        tap(() => {
          this._refreshNedeed.next()
        })
      )
  }

  deleteTutor(tutorId: number) {
    return this.http
      .delete(`${environment.domain}/TUTOR/${tutorId}`)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }
}
