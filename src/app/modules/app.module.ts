import {NgModule} from '@angular/core';

import {AppBootstrap} from './app.bootstrap';

import {CoreModule} from '../core/core.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthenticationModule} from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppBootstrap
  ],
  imports: [
    CoreModule,
    DashboardModule,
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppBootstrap]
})
export class AppModule {
}
