import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignInPage} from './pages/sign-in/sign-in.page';
import {ForgetPasswordPage} from './pages/forget-password/forget-password.page';

const routes: Routes = [
  {path: 'sign-in', component: SignInPage},
  {path:'forget-password', component: ForgetPasswordPage, children: [
    {path: 'account/:account/token/:token', component: ForgetPasswordPage},
  ]},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
