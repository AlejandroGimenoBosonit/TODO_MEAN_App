import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 90vh;
        min-width: 20vh;
      }
    `,
  ],
})
export class RegisterComponent implements OnInit {
  

  constructor() {}

  ngOnInit(): void {}
  
}
