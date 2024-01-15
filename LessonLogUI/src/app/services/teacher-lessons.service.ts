import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../models/pagination.model";
import {AddLessonDto} from "../models/dtos/add-lesson.dto";
import {EditLessonDto} from "../models/dtos/edit-lesson.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherLessonsService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getTeacherId(email: string) {
    return this.http.get(`${environment.domain}/TEACHER/email/${email}`);
  }

  getLessons(body: Pagination, teacherId: number, classId: number, subjectId: number) {
    return this.http.post<any>(`${environment.domain}/LESSON/pagination/${teacherId}/${classId}/${subjectId}`, body);
  }

  addLesson(lesson: AddLessonDto) {
    return this.http.post(`${environment.domain}/LESSON/add`, lesson)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  editLesson(lessonId: number, lessonData: EditLessonDto) {
    return this.http
      .put(`${environment.domain}/LESSON/edit/${lessonId}`, lessonData)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteLesson(lessonId: number) {
    return this.http
      .delete(`${environment.domain}/LESSON/${lessonId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
