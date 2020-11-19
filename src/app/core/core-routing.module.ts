import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {ErrorPage} from './error/error.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/manage/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'manage',
    redirectTo: '/manage/auth/sign-in',
    pathMatch: 'full'
  },

  {
    path: 'manage',
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            redirectTo: '/manage/auth/sign-in',
            pathMatch: 'full'
          },
          {
            path: 'sign-out',
            redirectTo: '/manage/auth/sign-out',
            pathMatch: 'full'
          },
          {
            path: 'forget-password',
            redirectTo: '/manage/auth/forget-password',
            pathMatch: 'full'
          },
          {
            path: 'forget-password/account/:account/token/:token',
            redirectTo: '/manage/auth/forget-password/account/:account/token/:token',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },

  {
    path: 'error',
    component: ErrorPage
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, enableTracing: true})],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
