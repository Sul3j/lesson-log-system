import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class StudentGradesService {

  constructor(private http: HttpClient,
              private urlService: UrlService) { }

  getGradesByStudentId(studentId: string) {
    return this.http.get(`${this.urlService.url}/GRADE/student/${studentId}`);
  }
}
