import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { CzInOptions } from '../../interfaces/cz-in.interface';

const ID_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IdInputDirective),
  multi: true,
};

const ID_VALUE_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IdInputDirective),
  multi: true,
};

@Directive({
  selector: '[ngxCzIn]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(click)': 'onClick()',
    '(input)': 'onInput($event.target.value)',
  },
  providers: [ID_VALUE_ACCESSOR, ID_VALUE_VALIDATOR],
})
export class IdInputDirective implements ControlValueAccessor {
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() options: CzInOptions;
  @Input() required: boolean;

  touchedFn: any = null;
  changeFn: any = null;
  disabled = false;
  emitted = null;

  prevValue = '';

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef<HTMLInputElement>,
  ) {}

  writeValue(val: string | null): void {
    this.onInput(val);
  }

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  onClick() {
    this.touchedFn?.();
  }

  onInput(value: string) {
    const id = value?.match(/\d+/g);

    if (!id) {
      this.updateView('');

      if (this.emitted !== null) {
        this.emitted = null;
        this.changeFn?.(null);
      }

      return;
    }

    const string = id.join('').slice(0, 8);

    this.updateView(string);

    if (this.options?.emitAll) {
      this.emitted = string;

      const idn = this.options?.addLeadingZeros
        ? isInValid(string, true)
          ? string.padStart(8, '0')
          : string
        : string;

      this.changeFn?.(idn);
      this.prevValue = string;

      return;
    }

    if (
      string.length === 8 ||
      (this.options?.addLeadingZeros && string.length < 8)
    ) {
      if (this.emitted !== string) {
        this.emitted = string;
        this.changeFn?.(
          !this.options?.emitInvalid
            ? isInValid(value, true)
              ? string.padStart(8, '0')
              : null
            : string,
        );
      }
    } else if (this.emitted) {
      this.emitted = null;
      this.changeFn?.(null);
    }
    this.prevValue = string;
  }

  updateView(string: string) {
    this.renderer.setProperty(this.el.nativeElement, 'value', string);
  }

  validate({ value }: FormControl) {
    if (!value && !this.required) return null;

    const isNotValid = !(
      (this.options?.emitAll || this.emitted) &&
      isInValid(value, true)
    );

    return {
      ...(isNotValid && {
        invalidCzIn: true,
      }),
    };
  }
}

export function isInValid(
  idn: string | number,
  addLeadingZeros = false,
): boolean {
  if (typeof idn === 'number') {
    idn = idn.toString();
  }

  if (idn.length < 8 && addLeadingZeros) {
    idn = idn.padStart(8, '0');
  }

  if (idn.length !== 8 || !idn?.match(/\d+/g)) return false;

  const result = [...idn.slice(0, 7)].reduce(
    (sum, num, index) => sum + (8 - index) * +num,
    0,
  );

  const rest = result % 11;
  const last = +idn.slice(-1);

  return (
    (rest === 0 && last === 1) ||
    (rest === 1 && last === 0) ||
    11 - rest === last
  );
}
