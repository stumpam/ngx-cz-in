# NgxCzId

Angular input for czech identification number (IČO) with validation.

## Quick Start

1. Import `NgxCzInModule` to your project.

```typescript
import { NgxCzInModule } from '@stumpam/ngx-cz-in';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxCzInModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. Use in HTML template

- add attributes min or max to validate even age of person with current id

```HTML
<input ngxCzId [formControl]="ctrl" [options]="options">
```

3. Optional options to emit only valid cz id value

```typescript
options: {
  emitInvalid: false;
  // emits all typed characters not just valid / invalid complete id
  emitAll: boolean;
  // it automatically add leading zeros for ins with them
  addLeadingZero: boolean;
}
```

Automatically emits `invalidCzIn` when length of string is valid but number is not valid identification number.

### Works with [formly](https://formly.dev)

and use it in the template

```HTML
<input ngxCzIn [formControl]="formControl" [options]="to.czInOptions>
```
