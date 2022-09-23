import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { map } from 'rxjs';
import { authResponse } from '../../../../../interfaces/interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})
export class LoginFormComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    // email set as empty string by default and validated as required and must have a pattern
    email: ['', [Validators.required, Validators.email]],
    // password set as empty string by default and must be longer than 6 characters
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor( 
    private rt: Router,
    private fb: FormBuilder,
    private as: AuthServiceService 
  ) { }

  ngOnInit(): void {
  }

  // methods
  login() {
    this.as
        .login( this.myForm.value )
        .pipe(
          map( (response: authResponse) => {
            if(response.process_ok){
              this.as.storeToken(response.token!);
              this.rt.navigateByUrl('/tasks/dashboard');
            }else{
              // PROBLEM PAGE
              console.log('nothing');
            }
          })
        )
        .subscribe();
  }
}
