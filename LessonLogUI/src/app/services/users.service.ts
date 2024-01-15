import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${environment.domain}/USER/all`);
  }

  getAllExistingUsers() {
    return this.http.get<any>(`${environment.domain}/USER`);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${environment.domain}/USER/${id}`);
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(`${environment.domain}/USER/${email}`);
  }
}
