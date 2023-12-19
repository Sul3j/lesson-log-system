import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class TutorLessonsService {

  constructor(private http: HttpClient,
              private urlService: UrlService) {}

  getTutorId(email: string) {
    return this.http.get(`${this.urlService.url}/TUTOR/email/${email}`);
  }
}
