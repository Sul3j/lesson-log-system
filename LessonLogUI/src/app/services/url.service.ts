import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly _url = "https://localhost:7212/api";

  private readonly _urlWithoutApi = "https://localhost:7212";

  constructor() { }

  get url() {
    return this._url;
  }

  get urlWithoutApi() {
    return this._urlWithoutApi;
  }
}
