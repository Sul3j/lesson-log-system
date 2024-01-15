import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TutorLessonsService {

  constructor(private http: HttpClient) {}

  getTutorId(email: string) {
    return this.http.get(`${environment.domain}/TUTOR/email/${email}`);
  }

  getLessonsByClassId(classId: number) {
    return this.http.get(`${environment.domain}/LESSON/class/${classId}`);
  }
}
