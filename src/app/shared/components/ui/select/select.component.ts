import {
  Component, Input, Injector, forwardRef,
  OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';

let _sid = 0;

export interface SelectOption {
  value: unknown;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="pf-field">

      @if (label) {
        <label [for]="uid" class="pf-field__label">
          {{ label }}
          @if (required) {
            <span class="pf-field__required" aria-hidden="true">*</span>
          }
        </label>
      }

      <select
        [id]="uid"
        class="form-select pf-field__select"
        [class.is-invalid]="isInvalid"
        [disabled]="isDisabled"
        [attr.aria-required]="required || null"
        [attr.aria-invalid]="isInvalid || null"
        (change)="onSelectionChange($event)"
        (blur)="onTouched()"
      >
        @if (placeholder) {
          <option value="" [disabled]="required" [selected]="value === null || value === '' || value === undefined">
            {{ placeholder }}
          </option>
        }

        @for (opt of options; track opt.value) {
          <option
            [value]="opt.value"
            [disabled]="opt.disabled ?? false"
            [selected]="opt.value === value"
          >
            {{ opt.label }}
          </option>
        }

        <!-- Opciones dinámicas proyectadas (para casos con pipes o plantillas complejas) -->
        <ng-content />
      </select>

      @if (isInvalid) {
        <div class="pf-field__error">{{ errorMessage }}</div>
      }

    </div>
  `,
  styles: [`
    :host { display: block; }

    .pf-field { position: relative; }

    .pf-field__label {
      display: block;
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--color-text-primary);
      margin-bottom: 0.35rem;
    }

    .pf-field__required {
      color: var(--color-danger-bs);
      margin-left: 2px;
    }

    .pf-field__select {
      border-radius: 6px;
      border: 1px solid #ced4da;
      font-size: 0.9rem;
      color: var(--color-text-primary);
      background-color: #fff;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

      &:focus {
        outline: none;
        border-color: var(--color-primary-accent);
        box-shadow: 0 0 0 0.2rem rgba(0, 75, 141, 0.15);
      }

      &.is-invalid {
        border-color: var(--color-danger-bs);

        &:focus {
          border-color: var(--color-danger-bs);
          box-shadow: 0 0 0 0.2rem rgba(185, 28, 28, 0.15);
        }
      }

      &:disabled {
        background-color: var(--color-bg-subtle);
        color: var(--color-text-muted);
        cursor: not-allowed;
        opacity: 1;
      }
    }

    .pf-field__error {
      font-size: 0.8rem;
      color: var(--color-danger-bs);
      margin-top: 0.25rem;
    }
  `]
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() label = '';
  @Input() placeholder = 'Seleccionar...';
  @Input() required = false;
  @Input() options: SelectOption[] = [];
  @Input() set inputId(v: string) { this.uid = v; }

  uid = `sel-${++_sid}`;
  value: unknown = null;
  isDisabled = false;

  private readonly cdr      = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private sub?: Subscription;

  private get ngControl(): NgControl | null {
    return this.injector.get(NgControl, null, { self: true, optional: true } as any);
  }

  ngOnInit(): void {
    this.sub = this.ngControl?.control?.statusChanges.subscribe(() =>
      this.cdr.markForCheck()
    );
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  get control(): AbstractControl | null { return this.ngControl?.control ?? null; }

  get isInvalid(): boolean {
    const c = this.control;
    return !!(c?.invalid && (c?.touched || c?.dirty));
  }

  get errorMessage(): string {
    const errors = this.control?.errors;
    if (!errors) return '';
    if (errors['required'])  return 'Este campo es obligatorio.';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;
    const firstKey = Object.keys(errors)[0];
    const val = errors[firstKey];
    return typeof val === 'string' ? val : 'Valor no válido.';
  }

  // ── ControlValueAccessor ───────────────────────────────────────────
  private _onChange: (v: unknown) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    this.value = value ?? null;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (v: unknown) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void          { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const raw = target.value;
    // Intentar preservar el tipo original desde la opción correspondiente
    const match = this.options.find(o => String(o.value) === raw);
    this.value = match ? match.value : raw;
    this._onChange(this.value);
    this.cdr.markForCheck();
  }
}
