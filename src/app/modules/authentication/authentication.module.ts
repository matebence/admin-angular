import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {CardComponent} from "./components/card/card.component";
import {SignInComponent} from "./pages/sign-in/sign-in.page";
import {AuthComponent} from "./pages/sign-in/components/auth/auth.component";
import {ResetComponent} from "./pages/forget-password/components/reset/reset.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.page";

import {SharedModule} from "../../shared/shared.module";
import {AuthenticationRoutingModule} from "./authentication-routing.module";

@NgModule({
  declarations: [
    CardComponent,
    AuthComponent,
    ResetComponent,
    SignInComponent,
    ForgetPasswordComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthenticationRoutingModule
  ],
  exports: [CardComponent]
})
export class AuthenticationModule {
}
