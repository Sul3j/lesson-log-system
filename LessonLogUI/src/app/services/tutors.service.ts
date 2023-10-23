import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class TutorsService {

  private _refreshNedeed = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNedeed;
  }

  getTutors(body: Pagination) {
    return this.http.post<any>(`${this.urlService.url}/TUTOR/pagination`, body);
  }

  getAllTutors() {
    return this.http.get(`${this.urlService.url}/TUTOR/all`);
  }

  addTutor(userId: number) {
    return this.http
      .post(`${this.urlService.url}/TUTOR/add`, { "userId": userId })
      .pipe(
        tap(() => {
          this._refreshNedeed.next()
        })
      )
  }

  deleteTutor(tutorId: number) {
    return this.http
      .delete(`${this.urlService.url}/TUTOR/${tutorId}`)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }
}
