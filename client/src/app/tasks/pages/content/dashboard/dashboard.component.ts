import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, subscribeOn } from 'rxjs';
import { authResponse, Card, UserInfo } from '../../../../interfaces/interface';
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    .workspace {
      min-height: 85%;
      height: auto;
      margin: 20px 10px;
      padding: 30px;
      background-color: #1e1e1e;
    } 
    .workspace_title {
      text-align: center;
      padding: 20px 0 10px 0;
    }
    .matrix {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
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
    private cs: ContentService
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
    // check for a token
    if( this.as.isToken() ){
      // get user token to apply
      this.as
          .getUserData( this.as.extractToken() )
          .pipe(
            mergeMap((response: authResponse)=>{
              // update local user data
              this.userModel = response.user!;
              return this.cs.getAllCards(response.user?._id)
            })
          )
          .subscribe(({process_ok, card_list})=>{
            if(process_ok){
              this.userCards = card_list!;
            }else{
              // TODO: Component: There's no cards
              console.log('no cards');
            }
          })
    }else{
      this.rt.navigate(['/login']);
    }
  }

}
