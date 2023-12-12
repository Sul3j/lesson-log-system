import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tutor-main-nav',
  templateUrl: './tutor-main-nav.component.html',
  styleUrls: ['./tutor-main-nav.component.scss']
})
export class TutorMainNavComponent {

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
