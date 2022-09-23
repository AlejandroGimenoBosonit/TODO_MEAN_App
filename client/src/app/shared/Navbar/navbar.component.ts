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
  user!: any;

  constructor() { }

  ngOnInit(): void {
    // extract token at the component's loading
    const token = localStorage.getItem('x-token');
    this.getNavbarItems( token! );
  }

  // methods
  getNavbarItems(token : string) {
    
    if (!token){
      return this.items = [
        {
          label: 'Login',
          icon: 'pi pi-user',
          routerLink: 'tasks/auth/login'
        },
        {
          label: 'Register',
          icon: 'pi pi-user-edit',
          routerLink: 'tasks/auth/register'
        }
      ];
    }else{
      // call getData to use user's info

      this.user = {
        name: 'John',
        secondName: 'Doe',
      };      

      return this.items = [
        // Icon
        {
          label: `${this.user.name} ${this.user.secondName}`,
          icon: 'pi pi-reddit',
          // routerLink to user account settings
        }
      ];
    }
  }
}
