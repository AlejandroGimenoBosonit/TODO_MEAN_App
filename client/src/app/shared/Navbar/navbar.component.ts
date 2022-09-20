import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserInfo } from '../../interfaces/interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  user!: UserInfo;

  constructor() { }

  ngOnInit(): void {
    // extract token at the component's loading
    const token = localStorage.getItem('x-token');
    this.getNavbarItems( token! );
  }

  // methods
  getNavbarItems(token : string) {
    if (token){
      return this.items = [
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
    }else{
      // call getData to use user's info

      // this.user = {

      // };      

      return this.items = [
        {
          label: 'meh',
          icon: 'pi pi-user',
          routerLink: 'login'
        },
        {
          label: 'meh',
          icon: 'pi pi-user-edit',
          routerLink: 'register'
        }
      ];
    }
  }
}
