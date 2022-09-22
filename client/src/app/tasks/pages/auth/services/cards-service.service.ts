import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse } from '../../../../interfaces/interface';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsServiceService {

  // endpoint
  private _endPoint: string = environment.backEndPoint;

  constructor( private http: HttpClient ) { }

  // methods
  getAllCards( userId: any ): Observable<authResponse> {
    return this.http.get<authResponse>(`${this._endPoint}/dashboard/${userId}/all`);
  }

  
}
