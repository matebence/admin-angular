import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ErrorComponent} from "./core/error/error.component";

const routes: Routes = [
  {path: '', redirectTo: '/auth/sign-in', pathMatch: 'full'},
  {path: '404', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
