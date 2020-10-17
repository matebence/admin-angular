import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ErrorPage} from './error/error.page';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: '404', component: ErrorPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
