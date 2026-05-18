import { Component, ChangeDetectionStrategy, computed, input, output, signal } from '@angular/core';

export type AlertVariant =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'dark' | 'light';

const ICON_MAP: Record<string, string> = {
  info:      'fa-solid fa-circle-info',
  success:   'fa-solid fa-circle-check',
  warning:   'fa-solid fa-triangle-exclamation',
  danger:    'fa-solid fa-circle-xmark',
  primary:   'fa-solid fa-circle-info',
  secondary: 'fa-solid fa-circle-info',
};

@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible() && isVisible()) {
      <div [class]="alertClass()" role="alert">
        <div class="d-flex align-items-start gap-2">
          @if (resolvedIcon()) {
            <i [class]="resolvedIcon() + ' flex-shrink-0 mt-1'" aria-hidden="true"></i>
          }
          <div class="flex-grow-1">
            @if (title()) {
              <strong class="d-block mb-1">{{ title() }}</strong>
            }
            <ng-content />
          </div>
        </div>
        @if (dismissible()) {
          <button
            type="button"
            class="btn-close"
            aria-label="Cerrar alerta"
            (click)="onDismiss()">
          </button>
        }
      </div>
    }
  `
})
export class AlertComponent {
  variant     = input<AlertVariant>('info');
  dismissible = input(false);
  icon        = input<string | null>(null);
  title       = input<string | null>(null);
  /** Control externo de visibilidad: útil para mostrar/ocultar desde el componente padre */
  visible     = input(true);

  dismissed = output<void>();

  protected isVisible = signal(true);

  readonly alertClass = computed(() =>
    `alert alert-${this.variant()}${this.dismissible() ? ' alert-dismissible fade show' : ''}`
  );

  readonly resolvedIcon = computed(() => {
    const explicit = this.icon();
    if (explicit !== null) return explicit;
    return ICON_MAP[this.variant()] ?? null;
  });

  onDismiss(): void {
    this.isVisible.set(false);
    this.dismissed.emit();
  }
}
