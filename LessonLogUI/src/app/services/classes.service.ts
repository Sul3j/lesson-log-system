import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../models/pagination.model";
import {ClassDto} from "../models/dtos/class.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getClasses(body: Pagination) {
    return this.http.post<any>(`${environment.domain}/CLASS/pagination`, body);
  }

  getAllClasses() {
    return this.http.get(`${environment.domain}/CLASS/all`);
  }

  addClass(classDto: ClassDto) {
    return this.http
      .post(`${environment.domain}/CLASS/add`, classDto)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteClass(classId: number) {
    return this.http
      .delete(`${environment.domain}/CLASS/${classId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  updateClass(classId: number, classDto: ClassDto) {
    return this.http
      .put(`${environment.domain}/CLASS/edit/${classId}`, classDto)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
