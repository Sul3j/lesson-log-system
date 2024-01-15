import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../models/pagination.model";
import {AddStudentDto} from "../models/dtos/add-student.dto";
import {EditStudentDto} from "../models/dtos/edit-student.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private _refreshNedeed = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNedeed;
  }

  getStudents(body: Pagination) {
    return this.http.post<any>(`${environment.domain}/STUDENT/pagination`, body);
  }

  getStudentId(email: string) {
    return this.http.get(`${environment.domain}/STUDENT/email/${email}`);
  }

  addStudent(student: AddStudentDto) {
    return this.http
      .post(`${environment.domain}/STUDENT/add`, student)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }

  editStudent(editData: EditStudentDto, studentId: number) {
    return this.http
      .put(`${environment.domain}/STUDENT/edit/${studentId}`, editData)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }

  deleteStudent(studentId: number) {
    return this.http
      .delete(`${environment.domain}/STUDENT/${studentId}`)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      );
  }

  getStudentsByClass(classId: number) {
    return this.http
      .get(`${environment.domain}/STUDENT/${classId}`)
      .pipe(
        tap(() => {
          this._refreshNedeed.next();
        })
      )
  }
}
