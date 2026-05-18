import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ph-header">
      <div class="ph-header__left">
        @if (icon()) {
          <div class="ph-header__icon-wrap" aria-hidden="true">
            <i [class]="icon()!"></i>
          </div>
        }
        <div>
          <h1 class="ph-header__title">{{ title() }}</h1>
          @if (subtitle()) {
            <p class="ph-header__subtitle">{{ subtitle() }}</p>
          }
        </div>
      </div>

      <div class="ph-header__right">
        <ng-content select="[actions]" />
      </div>
    </div>

    <ng-content select="[breadcrumb]" />
    <ng-content />

    @if (showDivider()) {
      <hr class="ph-divider" />
    }
  `,
  styles: [`
    :host { display: block; }

    .ph-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      padding: var(--space-4) 0;
      flex-wrap: wrap;
    }

    .ph-header__left {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      min-width: 0;
    }

    .ph-header__icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: var(--border-radius-xl);
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-white);
      font-size: var(--font-size-lg);
      flex-shrink: 0;
    }

    .ph-header__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-title);
      margin: 0;
      line-height: 1.2;
    }

    .ph-header__subtitle {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      margin: var(--space-1) 0 0;
    }

    .ph-header__right {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      flex-shrink: 0;
    }

    .ph-divider {
      border-color: var(--color-border-subtle);
      margin: 0 0 var(--space-5);
    }
  `]
})
export class PageHeaderComponent {
  title       = input.required<string>();
  subtitle    = input<string | null>(null);
  icon        = input<string | null>(null);
  showDivider = input(true);
}
