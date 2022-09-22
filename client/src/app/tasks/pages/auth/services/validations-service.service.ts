import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsServiceService {

  constructor() { }

  passMatches( password1: string, password2: string ) {
    return ( formGroup: AbstractControl ) => {
      // extract passwords from formGroup
      const pass1 = formGroup.get( password1 )?.value;
      const pass2 = formGroup.get( password2 )?.value;

      // check passwords
      if( pass1 !== pass2 ){
        // return response in case of error
        formGroup.get(pass2)?.setErrors({ notEquals: true });// there is error
        // response
        return { notEquals: true };
      }
      // Success case
      formGroup.get(pass2)?.setErrors(null); // there is no error
      return null;
    };
  }
}
