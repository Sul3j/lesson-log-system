import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  getUsers() {
    return this.http.get<any>(`${this.urlService.url}/User`);
  }
}
