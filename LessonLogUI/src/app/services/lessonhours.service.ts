import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LessonhoursService {

  private _refrshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refrshNeeded;
  }

  getAllLessonHours() {
    return this.http.get(`${environment.domain}/LESSONHOURS/all`);
  }
}
