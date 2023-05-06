import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, isFormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateform";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSignup() {
    if(this.signupForm.valid) {
      console.log(this.signupForm.value)
    } else {
      ValidateForm.validateAllFormFields(this.signupForm);
    }
  }

}
