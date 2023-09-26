import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private _refreshNedeed = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNedeed;
  }

  getStudents(body: Pagination) {
    return this.http.post<any>(`${this.urlService.url}/Student/pagination`, body);
  }
}
