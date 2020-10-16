import {NgModule} from '@angular/core';

import {AuthenticationPage} from './modules/authentication/authentication.page';

import {CoreModule} from "./core/core.module";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {AuthenticationModule} from "./modules/authentication/authentication.module";

@NgModule({
  declarations: [
    AuthenticationPage
  ],
  imports: [
    CoreModule,
    DashboardModule,
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AuthenticationPage]
})
export class AppModule {
}
