import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
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

const CZ_IN_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxCzInDirective),
  multi: true,
};

const CZ_IN_VALUE_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NgxCzInDirective),
  multi: true,
};

@Directive({
  selector: '[ngxCzIn]',
  standalone: true,
  providers: [CZ_IN_VALUE_ACCESSOR, CZ_IN_VALUE_VALIDATOR],
})
export class NgxCzInDirective implements ControlValueAccessor {
  @Input() min?: number;
  @Input() max?: number;
  @Input() options?: CzInOptions;

  @Input()
  get required(): boolean {
    return this.#required;
  }
  set required(search: BooleanInput) {
    this.#required = coerceBooleanProperty(search);
  }
  #required = false;

  touchedFn: any = null;
  changeFn: any = null;
  disabled = false;
  emitted: string | null = null;

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

  @HostListener('click')
  onClick() {
    this.touchedFn?.();
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string | null) {
    if (value === this.emitted) return;

    const id = value?.trim().match(/\d+/g);

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
      const idn = this.options?.addLeadingZeros
        ? isValid(string, true)
          ? string.padStart(8, '0')
          : string
        : string;

      this.emitted = idn;

      this.changeFn?.(idn);
      this.prevValue = string;

      return;
    }

    if (
      string.length === 8 ||
      (this.options?.addLeadingZeros &&
        string.length < 8 &&
        isValid(id[0], true))
    ) {
      if (this.emitted !== string) {
        const idn = this.options?.emitInvalid
          ? string
          : isValid(id[0], true)
          ? string.padStart(8, '0')
          : null;
        this.emitted = idn;
        this.changeFn?.(idn);
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

  validate({ value }: FormControl<string>) {
    if (!value) {
      if (this.options?.nonEmptyError && this.el.nativeElement.value !== '') {
        return { invalidCzIn: true };
      }

      if (!this.required) {
        return null;
      }
    }

    const isNotValid = !(
      (this.options?.emitAll || this.emitted) &&
      isValid(value, true)
    );

    return {
      ...(isNotValid && {
        invalidCzIn: true,
      }),
    };
  }

  @HostListener('blur')
  onBlur() {
    if (
      this.emitted !== this.el.nativeElement.value &&
      this.options?.addLeadingZeros &&
      isValid(this.prevValue, true) &&
      this.emitted
    ) {
      this.updateView(this.emitted);
      this.cd.markForCheck();
    }

    this.touchedFn?.();

    if (!this.emitted) {
      this.changeFn?.(null);
    }
  }
}

export function isValid(
  idn: string | number | null,
  addLeadingZeros = false,
): boolean {
  if (!idn) return false;

  if (typeof idn === 'number') {
    idn = idn.toString();
  }

  if (idn.length < 8 && addLeadingZeros) {
    idn = idn.padStart(8, '0');
  }

  if (idn.length !== 8 || !idn?.match(/\d+/g)) return false;

  let result = 0;

  // eslint-disable-next-line unicorn/no-useless-spread
  for (const [index, num] of [...idn.slice(0, 7)].entries()) {
    result = result + (8 - index) * +num;
  }
  const rest = result % 11;
  const last = +idn.slice(-1);

  return (
    (rest === 0 && last === 1) ||
    (rest === 1 && last === 0) ||
    11 - rest === last
  );
}
