import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {CardComponent} from "./authentication/components/card/card.component";
import {AuthenticationComponent} from './authentication/authentication.component';

import {AppRoutingModule} from "./app-routing.module";
import {AuthenticationModule} from "./authentication/authentication.module";

@NgModule({
  declarations: [
    CardComponent,
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
