import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {jwtDecode} from "jwt-decode";
import {UsersService} from "../../../services/users.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-tutor-main-nav',
  templateUrl: './tutor-main-nav.component.html',
  styleUrls: ['./tutor-main-nav.component.scss']
})
export class TutorMainNavComponent implements OnInit{
  public user: User = new User();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private toastr: ToastrService, private userService: UsersService) {}

  ngOnInit(): void {
    this.getUserByEmail();
  }

  logout() {
    this.auth.logout();
    this.toastr.success("Wylogowano!", "Sukces");
  }

  getUserByEmail() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.userService.getUserById(decodeToken.unique_name).subscribe((res: any) => {
      this.user = res;
    })
  }
}
