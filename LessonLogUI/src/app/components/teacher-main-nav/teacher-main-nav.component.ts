import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-teacher-main-nav',
  templateUrl: './teacher-main-nav.component.html',
  styleUrls: ['./teacher-main-nav.component.scss']
})
export class TeacherMainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private toastr: ToastrService) {}

  logout() {
    this.auth.logout();
    this.toastr.success("Logged out!", "Success");
  }
}
