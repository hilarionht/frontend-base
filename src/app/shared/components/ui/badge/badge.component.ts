import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

export type BadgeVariant =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'dark' | 'light';

export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="cssClass()" role="status"><ng-content /></span>`,
  styles: [`
    :host { display: inline-flex; }
    .badge--sm { font-size: var(--font-size-xs); }
  `]
})
export class BadgeComponent {
  variant = input<BadgeVariant>('secondary');
  pill    = input(false);
  size    = input<BadgeSize>('md');

  readonly cssClass = computed(() => [
    'badge',
    this.pill() ? 'rounded-pill' : '',
    `text-bg-${this.variant()}`,
    this.size() === 'sm' ? 'badge--sm' : ''
  ].filter(Boolean).join(' '));
}
