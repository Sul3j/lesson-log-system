import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Pagination} from "../models/pagination.model";
import {AddLessonDto} from "../models/dtos/add-lesson.dto";
import {EditLessonDto} from "../models/dtos/edit-lesson.dto";

@Injectable({
  providedIn: 'root'
})
export class TeacherLessonsService {

  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient,
              private urlService: UrlService) {}

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  getTeacherId(email: string) {
    return this.http.get(`${this.urlService.url}/TEACHER/email/${email}`);
  }

  getLessons(body: Pagination, teacherId: number, classId: number, subjectId: number) {
    return this.http.post<any>(`${this.urlService.url}/LESSON/pagination/${teacherId}/${classId}/${subjectId}`, body);
  }

  addLesson(lesson: AddLessonDto) {
    return this.http.post(`${this.urlService.url}/LESSON/add`, lesson)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  editLesson(lessonId: number, lessonData: EditLessonDto) {
    return this.http
      .put(`${this.urlService.url}/LESSON/edit/${lessonId}`, lessonData)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  deleteLesson(lessonId: number) {
    return this.http
      .delete(`${this.urlService.url}/LESSON/${lessonId}`)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
