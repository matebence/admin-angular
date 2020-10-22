import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {ErrorPage} from './error/error.page';

const routes: Routes = [
  {path: '', redirectTo: '/auth/sign-in', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'error', component: ErrorPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, enableTracing: true})],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
