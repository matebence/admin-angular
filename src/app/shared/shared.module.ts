import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LinkDirective} from './directives/link/link.directive';
import {ButtonDirective} from './directives/button/button.directive';

@NgModule({
  declarations: [
    LinkDirective,
    ButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [LinkDirective, ButtonDirective]
})
export class SharedModule {
}
