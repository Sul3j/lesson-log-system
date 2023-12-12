import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";
import {ClassDto} from "../models/dtos/class.dto";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getClasses(body: Pagination) {
    return this.http.post<any>(`${this.urlService.url}/CLASS/pagination`, body);
  }

  getAllClasses() {
    return this.http.get(`${this.urlService.url}/CLASS/all`);
  }

  addClass(classDto: ClassDto) {
    return this.http
      .post(`${this.urlService.url}/CLASS/add`, classDto)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteClass(classId: number) {
    return this.http
      .delete(`${this.urlService.url}/CLASS/${classId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  updateClass(classId: number, classDto: ClassDto) {
    return this.http
      .put(`${this.urlService.url}/CLASS/edit/${classId}`, classDto)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
