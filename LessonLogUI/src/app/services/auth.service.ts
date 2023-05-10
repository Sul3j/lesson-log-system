import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/registerDto";
import {LoginDto} from "../models/loginDto";
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _url: string = "https://localhost:7212/api/User/";
  private _jwtPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this._jwtPayload = this.decodeToken();
  }

  register(dto: RegisterDto) {
    return this.http.post<any>(`${this._url}register`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<any>(`${this._url}authenticate`, dto);
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

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if(this._jwtPayload)
      return this._jwtPayload.unique_name;
  }

  getRoleFromToken() {
    if(this._jwtPayload)
      return this._jwtPayload.role;
  }
}
