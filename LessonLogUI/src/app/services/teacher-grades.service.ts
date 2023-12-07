import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class TeacherGradesService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient,
              private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getGrades() {
    return this.http.get(`${this.urlService.url}/GRADE/all`);
  }
}
