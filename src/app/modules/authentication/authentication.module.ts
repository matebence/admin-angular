import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {SignInPage} from './pages/sign-in/sign-in.page';
import {ForgetPasswordPage} from './pages/forget-password/forget-password.page';

import {CardComponent} from './components/card/card.component';
import {AuthComponent} from './pages/sign-in/components/auth/auth.component';
import {ResetComponent} from './pages/forget-password/components/reset/reset.component';

import {SharedModule} from '../../shared/shared.module';
import {AuthenticationRoutingModule} from './authentication-routing.module';

@NgModule({
  declarations: [
    SignInPage,
    CardComponent,
    AuthComponent,
    ResetComponent,
    ForgetPasswordPage
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
  exports: [CardComponent]
})
export class AuthenticationModule {
}
