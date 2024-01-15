import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentLessonsService {

  constructor(private http: HttpClient ) {}

  getLessonsByClassId(classId: number) {
    return this.http.get(`${environment.domain}/LESSON/class/${classId}`);
  }
}
