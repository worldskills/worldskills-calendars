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
import { WorldskillsAngularLibModule } from '@worldskills/worldskills-angular-lib';

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
    FormsModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbIsoDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
