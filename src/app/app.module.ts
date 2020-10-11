import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ErrorComponent} from "./error/error.component";
import {CardComponent} from "./authentication/components/card/card.component";
import {AuthenticationComponent} from './authentication/authentication.component';

import {AppRoutingModule} from "./app-routing.module";
import {AuthenticationModule} from "./authentication/authentication.module";

@NgModule({
  declarations: [
    CardComponent,
    ErrorComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AuthenticationComponent]
})
export class AppModule {
}
