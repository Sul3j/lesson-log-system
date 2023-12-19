import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class TutorStudentsService {

  constructor(private http: HttpClient,
              private urlService: UrlService) {}

  getStudentByTutorId(tutorId: number) {
    return this.http.get(`${this.urlService.url}/STUDENT/tutor/${tutorId}`);
  }
}
