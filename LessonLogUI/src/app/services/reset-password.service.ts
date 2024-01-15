import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResetPassword} from "../models/reset-password.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${environment.domain}/USER/send-reset-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(`${environment.domain}/USER/reset-password`, resetPasswordObj);
  }
}
