import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/registerDto";
import {LoginDto} from "../models/loginDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string = "https://localhost:7212/api/User/";

  constructor(private http: HttpClient) { }

  register(dto: RegisterDto) {
    return this.http.post<any>(`${this.url}register`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<any>(`${this.url}authenticate`, dto);
  }
}
