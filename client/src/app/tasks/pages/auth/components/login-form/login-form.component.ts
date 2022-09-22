import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

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
    private fb: NonNullableFormBuilder,
    private as: AuthServiceService 
  ) { }

  ngOnInit(): void {
  }

  // methods
  login() {
    // console.log(this.myForm.value);
    this.as
        .login( this.myForm.value )
        .subscribe( response => {
          const { process_ok, token } = response;
          if(process_ok){
            // store toke nat local storage
            localStorage.setItem( 'x-token', token! );
            // redirect to dashboard
            this.rt.navigate(['/tasks/dashboard']);
          }else{
            // PROBLEM PAGE
            console.log('nothing');
          }
          
        })
  }
}
