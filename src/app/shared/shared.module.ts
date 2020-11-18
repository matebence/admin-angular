import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModalComponent} from './components/modal/modal.component';

import {LinkDirective} from './directives/link/link.directive';
import {ButtonDirective} from './directives/button/button.directive';

@NgModule({
  declarations: [
    ModalComponent,

    LinkDirective,
    ButtonDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [LinkDirective, ButtonDirective, ModalComponent]
})
export class SharedModule {
}
