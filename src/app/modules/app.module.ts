import {NgModule} from '@angular/core';

import {AppBootstrap} from './app.bootstrap';

import {CoreModule} from '../core/core.module';
import {AuthenticationModule} from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppBootstrap
  ],
  imports: [
    CoreModule,
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppBootstrap]
})
export class AppModule {
}
