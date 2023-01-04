# NgxCzIn

Angular input for czech identification number (IČO) with validation.

## Quick Start

1. Import `NgxCzInDirective` to your project (module) or component.

```typescript
import { NgxCzInDirective } from '@stumpam/ngx-cz-in';

@Component({
  selector: 'ngx-cz-in-root',
  standalone: true,
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxCzInDirective]
})
export class AppComponent
```

2. Use in HTML template

- add attributes min or max to validate even age of person with current id

```HTML
<input ngxCzIn [formControl]="ctrl" [options]="options">
```

3. Optional options to emit only valid cz id value

```typescript
options: {
  emitInvalid?: boolean;
  // emits all typed characters not just valid / invalid complete id
  emitAll?: boolean;
  // it automatically add leading zeros for ins with them
  addLeadingZero: boolean;
  // If input is not empty, but value is not correct, on blur event it will fire validation
  nonEmptyError?: boolean;
}
```

Automatically emits `invalidCzIn` when length of string is valid but number is not valid identification number.

### Works with [formly](https://formly.dev)

and use it in the template

```HTML
<input ngxCzIn [formControl]="formControl" [options]="to.czInOptions>
```
