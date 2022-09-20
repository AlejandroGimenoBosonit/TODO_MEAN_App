import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: 'login'
      },
      {
        label: 'Register',
        icon: 'pi pi-user-edit',
        routerLink: 'register'
      }
    ];
  }

}
