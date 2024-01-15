import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherTimetableService {

  constructor(private http: HttpClient) { }

  getTimetable(teacherId: number) {
    return this.http.get(`${environment.domain}/TIMETABLELESSON/teacher/${teacherId}`);
  }
}
