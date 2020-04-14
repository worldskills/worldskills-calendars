import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarItemsComponent } from './calendar-items/calendar-items.component';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { NgbIsoDateAdapter } from './ngb-iso-date-adapter';
import { AuthConfig } from 'angular-oauth2-oidc';
import { WorldskillsAngularLibModule } from '@worldskills/worldskills-angular-lib';

const serviceConfig = {
  appCode: 3400 ,
  userServiceEndpoint: `${environment.apiEndpoint}/auth`,
  resourceApiPath: `${environment.apiEndpoint}/resources`,
  authApiPath: `${environment.apiEndpoint}/auth`
};

const oAuthConfig = {
  loginUrl: environment.loginURI,
  clientId: environment.clientId,
  oidc: false,
  redirectUri: window.location.origin + '/',
  requireHttps: false
} as AuthConfig;

const httpConfig = {
  encoderUriPatterns: [],
  authUriPatterns: ['api.worldskills.org']
};

@NgModule({
  declarations: [
    AppComponent,
    CalendarItemsComponent,
    CalendarItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [`${environment.apiEndpoint}`],
        sendAccessToken: true
      }
    }),
    NgbModule,
    FormsModule,
    WorldskillsAngularLibModule.forConfig(serviceConfig, oAuthConfig, httpConfig)
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbIsoDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
