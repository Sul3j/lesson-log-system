import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, tap} from "rxjs";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";

@Injectable({
  providedIn: 'root'
})



export class AdminsService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getAdmins(body: Pagination) {
    return this.http.post<any>(`${this.urlService.url}/Admin/pagination`, body);
  }

  addAdmin(userId: number) {
    return this.http
      .post(`${this.urlService.url}/Admin/add`, { "userId": userId })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteAdmin(adminId: number) {
    return this.http
      .delete(`${this.urlService.url}/Admin/${adminId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
