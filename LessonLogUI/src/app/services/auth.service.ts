import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../models/dtos/register.dto";
import {LoginDto} from "../models/dtos/login.dto";
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenModel} from "../models/token-api.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtPayload: any;
  user: any;

  constructor(private http: HttpClient, private router: Router) {
    this.jwtPayload = this.decodeToken();
  }

  register(dto: RegisterDto) {
    return this.http.post<any>(`${environment.domain}/USER/register`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<any>(`${environment.domain}/USER/authenticate`, dto);
  }

  storeAccessToken(token: string) {
    this.user = this.getUser(token);
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
    if(this.jwtPayload)
      return this.jwtPayload.fullname;
  }

  getRoleFromToken() {
    if(this.jwtPayload)
      return this.jwtPayload.role;
  }

  renewToken(token: TokenModel) {
    return this.http.post<any>(`${environment.domain}/USER/refresh`, token);
  }

  private getUser(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
