import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";;
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentTimetableService {

  constructor(private http: HttpClient) { }

  getTimetable(classId: number) {
    return this.http.get(`${environment.domain}/TIMETABLELESSON/${classId}`);
  }
}
