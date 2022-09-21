import { Component, OnInit } from '@angular/core';
import { UserInfo, authResponse, Card } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { CardsServiceService } from '../auth/services/cards-service.service';
import { mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    .workspace {
      max-width: 100%;
      height: 100%;
      margin: 20px;
      background-color: #1e1e1e;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
    .workspace_title {
      text-align: center;
      margin: 20px 0 10px 0;
    }
  `]
})
// flex flex-row flex-wrap justify-content-center
export class DashboardComponent implements OnInit {

  userModel: UserInfo;
  // userCards
  userCards!: Card[];
  
  constructor(
    private rt: Router,
    private as: AuthServiceService,
    private cs: CardsServiceService
  ) { 
    this.userModel = {
      "_id":'',
      "name":'',
      "secondName":'',
      "age":0,
      "email":'',
  // TODO: MODIFY BACKEND TO AVOID SEND IN THE RESPONSE
      // "password":'',
      // "__v":0,
    }
  }

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('x-token');
    // console.log( token );
    if(token){

      this.as.getUserData( token! )
          .pipe(
            mergeMap( (response: authResponse) => {
              this.userModel = response.user!;
              return this.cs.getAllCards(response.user?._id)
            })
          )
          .subscribe(response => {
            console.log(response);
            if( response.process_ok ){
              this.userCards = response.card_list!;
            } else {
              //TODO: calling an alternative component to show there is no cards
              console.log('there is no cards');
            }
          });

    }else{
      // If there is no token then redirect to login page
      this.rt.navigate(['/login']);
    }
  }

}
