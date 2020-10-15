import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';

import {AuthenticationPage} from './modules/authentication/authentication.page';

import {CoreModule} from "./core/core.module";
import {AuthenticationModule} from "./modules/authentication/authentication.module";

@NgModule({
  declarations: [
    AuthenticationPage
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AuthenticationPage]
})
export class AppModule {
}
