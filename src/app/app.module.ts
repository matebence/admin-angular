import {NgModule} from '@angular/core';

import {AuthenticationPage} from './modules/authentication/authentication.page';

import {CoreModule} from "./core/core.module";
import {AuthenticationModule} from "./modules/authentication/authentication.module";

@NgModule({
  declarations: [
    AuthenticationPage
  ],
  imports: [
    CoreModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AuthenticationPage]
})
export class AppModule {
}
