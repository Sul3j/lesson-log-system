import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateform";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private auth: AuthService, private router: Router) {
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
          next: () => {
            this.toastr.success("successfully login!");
            this.loginForm.reset();
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.toastr.error(err.error.message, "Error");
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm)
      this.toastr.error("Your form is invalid");
    }
  }
}

