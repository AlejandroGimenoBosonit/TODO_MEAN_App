import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [`
    .main-title {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
  `]
})
export class MainPageComponent implements OnInit {

  constructor(private rt: Router,) { }

  ngOnInit(): void {
    const token = localStorage.getItem('x-token');
    if (token) this.rt.navigate(['/dashboard']);
  }

}
