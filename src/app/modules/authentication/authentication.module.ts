import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {AuthComponent} from "./pages/sign-in/components/auth/auth.component";
import {ResetComponent} from "./pages/forget-password/components/reset/reset.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";

import {LinkDirective} from "../../shared/directives/link/link.directive";
import {ButtonDirective} from "../../shared/directives/button/button.directive";

import {AuthenticationRoutingModule} from "./authentication-routing.module";

@NgModule({
  declarations: [
    AuthComponent,
    LinkDirective,
    ResetComponent,
    SignInComponent,
    ButtonDirective,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule{}
