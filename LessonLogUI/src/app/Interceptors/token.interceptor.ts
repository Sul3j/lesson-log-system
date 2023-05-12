import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenModel} from "../models/token-api.model";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getAccessToken();

    if(token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => new Error("Some other error occured"));
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenModel = new TokenModel();
    tokenModel.accessToken = this.auth.getAccessToken()!;
    tokenModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenModel)
      .pipe(
        switchMap((data: TokenModel) => {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeAccessToken(data.accessToken);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.accessToken}` }
          })
          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            this.toastr.warning("Token is expired, please login again", "Warning");
            this.router.navigate(['login']);
          })
        })
      )

  }
}
