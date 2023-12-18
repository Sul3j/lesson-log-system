import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class TeacherTimetableService {

  constructor(private http: HttpClient,
              private urlService: UrlService) { }

  getTimetable(teacherId: number) {
    return this.http.get(`${this.urlService.url}/TIMETABLELESSON/teacher/${teacherId}`);
  }
}
