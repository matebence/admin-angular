import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {CardComponent} from './components/card/card.component';
import {AuthComponent} from './pages/sign-in/components/auth/auth.component';
import {ResetComponent} from './pages/forget-password/components/reset/reset.component';

import {SignInPage} from './pages/sign-in/sign-in.page';
import {AuthenticationPage} from './authentication.page';
import {SignOutPage} from './pages/sign-out/sign-out.page';
import {ForgetPasswordPage} from './pages/forget-password/forget-password.page';

import {AuthorizationService} from '../../core/services/authorization-server/authorization.service';

import {SharedModule} from '../../shared/shared.module';
import {AuthenticationRoutingModule} from './authentication-routing.module';

@NgModule({
  declarations: [
    SignInPage,
    SignOutPage,
    CardComponent,
    AuthComponent,
    ResetComponent,
    AuthenticationPage,
    ForgetPasswordPage,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
  providers: [
    AuthorizationService
  ],
  exports: [AuthenticationPage]
})
export class AuthenticationModule {
}
