import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateform";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  register() {
    if(this.signupForm.valid) {
      this.auth.register(this.signupForm.value)
        .subscribe({
          next: () => {
            this.toastr.success("registered user!");
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          error: () => {
            this.toastr.error("something went wrong!");
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.signupForm);
      this.toastr.error("Your form is invalid");
    }
  }

}
