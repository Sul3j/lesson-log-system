import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private readonly _url: string = "https://localhost:7212/api/Admin/";
  private readonly _urlUser: string = "https://localhost:7212/api/User/";
  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getAdmins() {
    return this.http.get<any>(this._url);
  }

  getUsers() {
    return this.http.get<any>(this._urlUser + 'role/USER');
  }

  addAdmin(userId: number) {
    return this.http
      .post(this._url + 'add', { "userId": userId })
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteAdmin(adminId: number) {
    return this.http
      .delete(this._url + adminId)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
