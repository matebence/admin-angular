import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ErrorComponent} from "./error/error.component";

import {LinkDirective} from "../shared/directives/link/link.directive";
import {ButtonDirective} from "../shared/directives/button/button.directive";

import {CoreRoutingModule} from "./core-routing.module";

@NgModule({
  declarations: [
    LinkDirective,
    ErrorComponent,
    ButtonDirective
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [ErrorComponent, LinkDirective, ButtonDirective, CoreRoutingModule]
})
export class CoreModule {
}
