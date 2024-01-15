import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TutorStudentsService {

  constructor(private http: HttpClient) {}

  getStudentByTutorId(tutorId: number) {
    return this.http.get(`${environment.domain}/STUDENT/tutor/${tutorId}`);
  }
}
