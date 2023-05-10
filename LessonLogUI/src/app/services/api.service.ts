import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _url: string = "https://localhost:7212/api/User/";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this._url);
  }
}
