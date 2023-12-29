import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {UsersService} from "../../../services/users.service";
import {User} from "../../../models/user.model";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public user: User = new User();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private toastr: ToastrService, private userService: UsersService) {}

  logout() {
    this.auth.logout();
    this.toastr.success("Logged out!", "Success");
  }

  ngOnInit(): void {
    this.getUserByEmail();
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
