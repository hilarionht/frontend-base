import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

export type SpinnerVariant =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerType = 'border' | 'grow';

@Component({
  selector: 'app-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="spinnerClass()" role="status" [attr.aria-label]="label()">
      <span class="visually-hidden">{{ label() }}</span>
    </div>`,
  styles: [`
    :host { display: inline-flex; }
    .spinner--lg { width: 3rem; height: 3rem; }
  `]
})
export class SpinnerComponent {
  size    = input<SpinnerSize>('md');
  variant = input<SpinnerVariant>('primary');
  type    = input<SpinnerType>('border');
  label   = input('Cargando...');

  readonly spinnerClass = computed(() => [
    `spinner-${this.type()}`,
    `text-${this.variant()}`,
    this.size() === 'sm' ? `spinner-${this.type()}-sm` : '',
    this.size() === 'lg' ? 'spinner--lg' : ''
  ].filter(Boolean).join(' '));
}
