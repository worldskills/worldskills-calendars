import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getLoggedInUser(): Observable<{}> {
    let url = `${environment.apiEndpoint}/auth/users/loggedIn?show_child_roles=false&app_code=1400`;
    return this.http.get(url);
  }

  logOut(authorizationHeader: string): Observable<{}> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorizationHeader
      })
    };
    let url = `${environment.apiEndpoint}/auth/sessions/logout`;
    return this.http.post(url, '', httpOptions);
  }
}
