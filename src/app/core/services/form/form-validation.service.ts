import { Injectable } from '@angular/core';
import { IErrorMessage } from 'src/app/models/auth/auth-forms.model';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() {}
  fieldHasError(fieldName: string, targetForm: any): boolean {
    const formField = targetForm?.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  getErrorMessage(fieldName: string, targetForm: any): string {
    const errorMessage: IErrorMessage<string> = {
      email: 'Email format is incorrect',
      password: 'Password must contain one uppercase, one lowercase and one special characters of #?!@$%^&*-'
    }
    const formField = targetForm?.get(fieldName);
    const fieldErrors = targetForm?.controls[fieldName].errors;
    
    return formField?.hasError('required')
      ? 'Reuired field'
      : formField?.hasError('pattern')
      ? (errorMessage[fieldName])
      : formField?.hasError('minlength')
      ? `Input should contain at least
      ${this.getLengthError(fieldErrors?.['minlength'])} characters`
      : formField?.hasError('maxlength')
      ? `Input should contain max
      ${this.getLengthError(fieldErrors?.['maxlength'])} characters`
      // : formField?.hasError('pattern')
      // ? (errorMessage[formField])
      : formField?.hasError('mismatch')
      ? 'Passwords mismatch'
      : 'Unknown error';
  }
  // MAKE LENGTH ERRORS SHORTER
  private getLengthError(fieldError: any): string {
    return `(${fieldError?.actualLength} / ${fieldError?.requiredLength})`;
  }
}
