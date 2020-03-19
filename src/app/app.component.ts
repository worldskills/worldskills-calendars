import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from './../environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WorldSkills Calendars';
  environmentWarning = environment.environmentWarning;
  user = null;

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService
  ) {
    this.oauthService.configure({
      loginUrl: environment.loginURI,
      clientId: environment.clientId,
      oidc: false,
      redirectUri: window.location.origin + '/',
      requireHttps: false,
    });

    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tryLogin();

    if (!this.isLoggedIn) {
      this.login();
    } else {
      this.authService.getLoggedInUser().subscribe(user => {
        this.user = user;
      }, error => {
        if (error.status === 401) {
          this.oauthService.initImplicitFlow();
        }
      });
    }
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    const authorizationHeader = this.oauthService.authorizationHeader();
    this.oauthService.logOut();
    this.authService.logOut(authorizationHeader).subscribe(() => {
      window.location.reload();
    });
  }

  get isLoggedIn() {
    const token = this.oauthService.getAccessToken();
    if (!token) return false;
    return true;
  }
}
