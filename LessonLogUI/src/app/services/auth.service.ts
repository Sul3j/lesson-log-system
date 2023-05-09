import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/registerDto";
import {LoginDto} from "../models/loginDto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string = "https://localhost:7212/api/User/";

  constructor(private http: HttpClient, private router: Router) { }

  register(dto: RegisterDto) {
    return this.http.post<any>(`${this.url}register`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<any>(`${this.url}authenticate`, dto);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
