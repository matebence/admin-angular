import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignInPage} from './pages/sign-in/sign-in.page';
import {AuthenticationPage} from './authentication.page';
import {SignOutPage} from './pages/sign-out/sign-out.page';
import {ForgetPasswordPage} from './pages/forget-password/forget-password.page';

const routes: Routes = [
  {
    path: 'auth',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthenticationPage,
    children: [
      {
        path: 'sign-in',
        component: SignInPage
      },
      {
        path: 'sign-out',
        component: SignOutPage
      },
      {
        path: 'forget-password',
        component: ForgetPasswordPage,
        children: [
          {
            path: 'account/:account/token/:token',
            component: ForgetPasswordPage
          },
        ]
      },
      {
        path: '**',
        redirectTo: '/error',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
