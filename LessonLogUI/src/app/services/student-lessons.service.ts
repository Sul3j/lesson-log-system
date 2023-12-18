import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class StudentLessonsService {

  constructor(private http: HttpClient,
              private urlService: UrlService) {}

  getStudentId(email: string) {
    return this.http.get(`${this.urlService.url}/STUDENT/email/${email}`);
  }
}
