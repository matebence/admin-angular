import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AuthenticationComponent} from './modules/authentication/authentication.page';

import {CoreModule} from "./core/core.module";
import {AuthenticationModule} from "./modules/authentication/authentication.module";

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AuthenticationComponent]
})
export class AppModule {
}
