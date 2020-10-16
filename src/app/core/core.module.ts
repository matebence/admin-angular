import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

import {RouteBuilder} from "./http/route-builder.http";

import {ErrorPage} from "./error/error.page";

import {SharedModule} from "../shared/shared.module";
import {CoreRoutingModule} from "./core-routing.module";

@NgModule({
  declarations: [
    ErrorPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    CoreRoutingModule
  ],
  providers: [
    RouteBuilder
  ],
  exports: [ErrorPage, CoreRoutingModule]
})
export class CoreModule {
}
