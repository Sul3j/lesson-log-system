import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly _url = "https://localhost:7212/api";

  constructor() { }

  get url() {
    return this._url;
  }
}
