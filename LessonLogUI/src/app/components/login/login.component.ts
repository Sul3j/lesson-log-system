import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateform";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private auth: AuthService, private router: Router, private userData: UserDataService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.toastr.success("Is logged in");
            this.loginForm.reset();
            this.auth.storeAccessToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            let payload = this.auth.decodeToken();
            this.userData.setFullName(payload.unique_name);
            this.userData.setRole(payload.role);
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.toastr.error(err.error.message, "Error");
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm)
      this.toastr.error("Your form is invalid", "Error");
    }
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  sendResetCode() {
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail = "";
    }
  }
}

