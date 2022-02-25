import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ngx-cz-in-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyComponent extends FieldType {
  blur = false;

  constructor(private readonly cd: ChangeDetectorRef) {
    super();
  }
}
