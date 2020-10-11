import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ErrorComponent} from "./error/error.component";

import {SharedModule} from "../shared/shared.module";
import {CoreRoutingModule} from "./core-routing.module";

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
  ],
  exports: [ErrorComponent, CoreRoutingModule]
})
export class CoreModule {
}
