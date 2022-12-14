import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// interfaces
import { UserInfo, authResponse, loginForm } from '../../../../interfaces/interface';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // endpoint
  private _endPoint: string = environment.backEndPoint;

  constructor( private http: HttpClient ) { }

  // methods

  isToken(): boolean {
    return !!localStorage.getItem('x-token')
  }

  storeToken(token: string): void {
    localStorage.setItem('x-token', token);
  }

  extractToken(): string {
    return localStorage.getItem('x-token')!;  
  }

  register( payload: UserInfo ): Observable<authResponse> {
    // console.log(payload);
    // http request
    return this.http.post<authResponse>( `${this._endPoint}/api/auth/register`, payload );
  }

  login( payload: loginForm ): Observable<authResponse> {
    // console.log(payload);
    return this.http.post<authResponse>( `${this._endPoint}/api/auth/login`, payload );
  }

  getUserData(token: string): Observable<authResponse>{
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('x-token', token);

    return this.http.get<authResponse>(`${this._endPoint}/api/auth/`, {headers});
  }
}
