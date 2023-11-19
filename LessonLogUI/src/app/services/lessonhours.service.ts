import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class LessonhoursService {

  private _refrshNeeded = new Subject<void>();

  constructor(private http: HttpClient, private urlService: UrlService) { }

  get refreshNeeded() {
    return this._refrshNeeded;
  }

  getAllLessonHours() {
    return this.http.get(`${this.urlService.url}`)
  }
}
