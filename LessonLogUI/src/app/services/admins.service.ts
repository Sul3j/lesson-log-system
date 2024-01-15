import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, tap} from "rxjs";
import {Pagination} from "../models/pagination.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})



export class AdminsService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getAdmins(body: Pagination) {
    return this.http.post<any>(`${environment.domain}/Admin/pagination`, body);
  }

  addAdmin(userId: number) {
    return this.http
      .post(`${environment.domain}/Admin/add`, { "userId": userId })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteAdmin(adminId: number) {
    return this.http
      .delete(`${environment.domain}/Admin/${adminId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
