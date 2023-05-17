import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/registerDto";
import {LoginDto} from "../models/loginDto";
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenModel} from "../models/token-api.model";

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

  storeAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  storeRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getAccessToken() {
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
    const token = this.getAccessToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if(this._jwtPayload)
      return this._jwtPayload.fullname;
  }

  getRoleFromToken() {
    if(this._jwtPayload)
      return this._jwtPayload.role;
  }

  renewToken(token: TokenModel) {
    return this.http.post<any>(`${this._url}refresh`, token);
  }
}
