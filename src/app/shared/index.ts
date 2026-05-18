// ── Formularios ─────────────────────────────────────────────────────────────
export { FormFieldComponent }      from './components/form-field/form-field.component';
export { FormCheckComponent }      from './components/form-check/form-check.component';
export { FormErrorsComponent }     from './components/form-errors/form-error.component';
export { InputDatepickerComponent } from './components/input-datepicker/input-datepicker.component';
export { SearchInputComponent }    from './components/search-input/search-input.component';
export { SelectComponent }         from './components/ui/select/select.component';
export type { SelectOption }       from './components/ui/select/select.component';

// ── UI Primitivos ────────────────────────────────────────────────────────────
export { BadgeComponent }          from './components/ui/badge/badge.component';
export type { BadgeVariant, BadgeSize } from './components/ui/badge/badge.component';

export { AlertComponent }          from './components/ui/alert/alert.component';
export type { AlertVariant }       from './components/ui/alert/alert.component';

export { SpinnerComponent }        from './components/ui/spinner/spinner.component';
export type { SpinnerVariant, SpinnerSize, SpinnerType } from './components/ui/spinner/spinner.component';

export { PageHeaderComponent }     from './components/ui/page-header/page-header.component';

// ── Botones ──────────────────────────────────────────────────────────────────
export { GenericButtonComponent }  from './components/generic-button/generic-button.component';
export { ActionButtonComponent }   from './components/action-button/action-button.component';

// ── Cards ────────────────────────────────────────────────────────────────────
// AppCardComponent  → selector: app-card         (uso general)
// CardComponent     → selector: app-section-card (cards con slot=footer para formularios)
export { AppCardComponent }        from './components/app-card/app-card.component';
export { CardComponent }           from './components/card/card.component';
export type { CardVariant }        from './components/card/card.component';
export { CardInfoComponent }       from './components/card/card-info.component';
export { StatCardComponent }       from './components/stat-card/stat-card.component';

// ── Tabla y Paginación ───────────────────────────────────────────────────────
export { GenericTableComponent }   from './components/generic-table/generic-table.component';
export { PaginationComponent }     from './components/pagination/pagination.component';

// ── Modales ──────────────────────────────────────────────────────────────────
export { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
export { ConfirmModalComponent }       from './components/confirm-modal/confirm-modal.component';
