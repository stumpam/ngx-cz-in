import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CzInInputDirective } from './directives/input/input.directive';

@NgModule({
  imports: [CommonModule],
  exports: [CzInInputDirective],
  declarations: [CzInInputDirective],
})
export class NgxCzInModule {}
