import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TutorGradesService {

  constructor(private http: HttpClient) { }

  getGradesByStudentId(studentId: string) {
    return this.http.get(`${environment.domain}/GRADE/student/${studentId}`);
  }
}
