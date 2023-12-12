import {Component, OnInit} from '@angular/core';
import {ResetPassword} from "../../../models/reset-password.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPasswordValidator} from "../../../helpers/confirm-password.validator";
import {ActivatedRoute, Router} from "@angular/router";
import ValidateForm from "../../../helpers/validateform";
import {ResetPasswordService} from "../../../services/reset-password.service";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },{
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });

    this.activatedRoute.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
    })
  }

  submit() {
    if(this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
        .subscribe({
          next: (res) => {
            this.toastr.success("Password reset successfully!", "Success");
            this.router.navigate(['/']);
          }, error: (err) => {
            this.toastr.error("Something went wrong!", "Error");
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
      this.toastr.error("Form data is invalid!", "Error");
    }
  }
}
