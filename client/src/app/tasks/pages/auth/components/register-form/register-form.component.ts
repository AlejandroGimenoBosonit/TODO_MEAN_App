import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ValidationsServiceService } from '../../services/validations-service.service';
import { map } from 'rxjs';
import { authResponse } from '../../../../../interfaces/interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [`
    span {
        width: 224px;
        text-align: center;
      }
  `]
})
export class RegisterFormComponent implements OnInit {

  myForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]],
      // email set as empty string by default and validated as required and must have a pattern
      email: ['', [Validators.required, Validators.email]],
      // password set as empty string by default and must be longer than 6 characters
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.vs.passMatches('password', 'password2')],
    }
  );

  constructor(
    private rt: Router,
    private fb: FormBuilder,
    private vs: ValidationsServiceService,
    private as: AuthServiceService
  ) { }

  ngOnInit(): void {
  }

  // methods

  get emailErrorMssg(): string {
    const error = this.myForm.get('email')?.errors;

    if (error?.['required']) {
      return 'Email is required';
    } else if (error?.['pattern']) {
      return 'Email format invalid';
    } else if (error?.['usedEmail']) {
      return 'Email is in use';
    }
    return '';
  }

  // conditional way to  display error messages
  validField(field: string): boolean | undefined {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  register() {
    this.as
        .register( this.myForm.value )
        .pipe(
          map( (response: authResponse)=>{
            if(response.process_ok){
              this.as.storeToken( response.token! );
              this.rt.navigate(['/tasks/dashboard']);
            }else{
              // PROBLEM PAGE
              console.log('nothing');
            }
          })
        )
        .subscribe();
  }

}
