import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { NgxCzInModule } from '@stumpam/ngx-cz-in';

import { AppComponent } from './app.component';
import { FormlyComponent } from './formly/formly.component';

@NgModule({
  declarations: [AppComponent, FormlyComponent],
  imports: [
    BrowserModule,
    NgxCzInModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({
      types: [{ name: 'cz-in', component: FormlyComponent }],
      validationMessages: [
        { name: 'required', message: 'Required' },
        { name: 'invalidCzId', message: 'invalidCzId' },
        { name: 'invalidMinCzId', message: 'invalidMinCzId' },
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
