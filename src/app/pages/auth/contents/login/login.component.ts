import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth';
import { FormValidationService } from 'src/app/core/services/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  // INIT LOGIN FORM DIRECTLY
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(
          '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.authService.login({
      email: 'toan@gmail.com',
      password: '12345@Aa'
    });
  }
  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.loginForm);
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.loginForm
    );
  }
  // SUBMIT LOGIN FORM
  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

}
