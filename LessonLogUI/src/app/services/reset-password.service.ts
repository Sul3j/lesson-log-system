import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResetPassword} from "../models/reset-password.model";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private readonly url: string = "https://localhost:7212/api/User/";

  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.url}send-reset-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(`${this.url}reset-password`, resetPasswordObj);
  }
}
