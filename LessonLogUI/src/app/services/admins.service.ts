import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, tap} from "rxjs";
import {UrlService} from "./url.service";
import {AdminPagination} from "../models/admin-pagination.model";

@Injectable({
  providedIn: 'root'
})



export class AdminsService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getAdmins(adminsBody: AdminPagination) {
    return this.http.post<any>(`${this.urlService.url}/Admin/pagination`, adminsBody);
  }

  getUsers() {
    return this.http.get<any>(`${this.urlService.url}/User/role/USER`);
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
