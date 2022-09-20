import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .card-container {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 90vh;
    }
  `]
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    // email set as empty string by default and validated as required and must have a pattern
    email: ['', [Validators.required, Validators.email]],
    // password set as empty string by default and must be longer than 6 characters
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor( 
    private fb: NonNullableFormBuilder,
    private as: AuthServiceService 
  ) { }

  ngOnInit(): void {
  }

  // methods
  login() {
    // console.log(this.myForm.value);
    this.as.login( this.myForm.value ).subscribe( console.log );
  }

}
