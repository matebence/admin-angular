import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";

const routes: Routes = [
  {path: 'auth', redirectTo: '/auth/sign-in', pathMatch: 'full'},
  {path: 'auth', children: [
      {path: 'sign-in', component: SignInComponent},
      {path: 'forget-password', component: ForgetPasswordComponent}
    ]
  },
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
