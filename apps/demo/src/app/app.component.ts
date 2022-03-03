import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CzInOptions } from '@stumpam/ngx-cz-in';

@Component({
  selector: 'ngx-cz-in-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'ngx-cz-in';

  ctrl = new FormControl('');
  ctrl2 = new FormControl('');

  ctrl3 = '';

  options: CzInOptions = {
    emitAll: false,
    emitInvalid: false,
    addLeadingZeros: true,
  };

  update(x: any) {
    console.log(x);
  }

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'id',
      type: 'cz-in',
      templateOptions: {
        label: 'Id',
        required: true,
        attributes: {
          inputmode: 'double',
          autocomplete: 'off',
        },
        czIdOptions: {
          emitInvalid: false,
        },
      },
    },
  ];

  ngOnInit() {
    this.ctrl.valueChanges.subscribe(val =>
      console.log('appCmp: ', val, this.ctrl.errors),
    );
    this.ctrl2.valueChanges.subscribe(val =>
      console.log('appCmp2: ', val, this.ctrl2.errors),
    );
    // this.ctrl3.valueChanges.subscribe(val => {
    //   console.log('appCmp2: ', val, this.ctrl3.errors);
    // });
    this.form.valueChanges.subscribe(val =>
      console.log('formly: ', val, this.form.errors),
    );
  }
}
