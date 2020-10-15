import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

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
    CoreRoutingModule
  ],
  exports: [ErrorPage, CoreRoutingModule]
})
export class CoreModule {
}
