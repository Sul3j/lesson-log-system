import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _name = new BehaviorSubject<string>("");
  private _role = new BehaviorSubject<string>("");

  constructor() { }

  public getRole() {
    return this._role.asObservable();
  }

  public setRole(role: string) {
    this._role.next(role);
  }

  public getFullName() {
    return this._name.asObservable();
  }

  public setFullName(name: string) {
    this._name.next(name);
  }
}
