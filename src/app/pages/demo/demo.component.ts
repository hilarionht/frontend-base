import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HighchartsChartComponent } from 'highcharts-angular';

import { StatCardComponent }        from '@shared/components/stat-card/stat-card.component';
import { AppCardComponent }          from '@shared/components/app-card/app-card.component';
import { CardComponent }             from '@shared/components/card/card.component';
import { BadgeComponent }            from '@shared/components/ui/badge/badge.component';
import { AlertComponent }            from '@shared/components/ui/alert/alert.component';
import { SpinnerComponent }          from '@shared/components/ui/spinner/spinner.component';
import { PageHeaderComponent }       from '@shared/components/ui/page-header/page-header.component';
import { SelectComponent }           from '@shared/components/ui/select/select.component';
import { GenericButtonComponent }    from '@shared/components/generic-button/generic-button.component';
import { ActionButtonComponent }     from '@shared/components/action-button/action-button.component';
import { FormFieldComponent }        from '@shared/components/form-field/form-field.component';
import { FormCheckComponent }        from '@shared/components/form-check/form-check.component';
import { InputDatepickerComponent }  from '@shared/components/input-datepicker/input-datepicker.component';
import { FormErrorsComponent }       from '@shared/components/form-errors/form-error.component';

import type { BadgeVariant } from '@shared/components/ui/badge/badge.component';
import type { SelectOption }  from '@shared/components/ui/select/select.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Charts
    HighchartsChartComponent,
    // Cards
    StatCardComponent, AppCardComponent, CardComponent,
    // UI Primitivos
    BadgeComponent, AlertComponent, SpinnerComponent, PageHeaderComponent,
    // Formularios
    SelectComponent, FormFieldComponent, FormCheckComponent,
    InputDatepickerComponent, 
    // Botones
    GenericButtonComponent, ActionButtonComponent,
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
})
export class DemoComponent {
  private readonly toastr  = inject(ToastrService);
  private readonly fb      = inject(FormBuilder);

  // ── Highcharts ────────────────────────────────────────────
  readonly chartOptions = {
    chart: { type: 'area', backgroundColor: 'transparent', height: 280 },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'] },
    yAxis: { title: { text: 'Millones MXN' } },
    series: [
      { name: 'Cartera Activa',   data: [12, 18, 15, 22, 28, 31], type: 'area' },
      { name: 'Recuperaciones',   data: [5, 8, 7, 11, 14, 17],   type: 'area' },
    ],
  };

  // ── KPIs ──────────────────────────────────────────────────
  readonly kpis = [
    { label: 'Contratos Activos', value: '1,284', icon: 'fa-solid fa-file-contract',       color: 'primary' as const, sublabel: 'Cartera vigente',      trend: 4.2  },
    { label: 'Capital Total',     value: '$31.4M', icon: 'fa-solid fa-coins',              color: 'success' as const, sublabel: 'Mes actual',            trend: 2.8  },
    { label: 'Vencidos Hoy',      value: '37',     icon: 'fa-solid fa-triangle-exclamation', color: 'warning' as const, sublabel: 'Requieren atención',  trend: -1.5 },
    { label: 'En Mora',           value: '12',     icon: 'fa-solid fa-circle-xmark',       color: 'danger'  as const, sublabel: 'Más de 30 días',        trend: -3.1 },
  ];

  // ── Tabla de muestra ──────────────────────────────────────
  readonly rows = [
    { id: 'C-0041', cliente: 'Empresa Alpha S.A.',  monto: '$450,000', estado: 'Activo',  vence: '2025-08-15' },
    { id: 'C-0042', cliente: 'Beta Corp',           monto: '$120,000', estado: 'Vencido', vence: '2025-04-01' },
    { id: 'C-0043', cliente: 'Gamma Inversiones',   monto: '$890,000', estado: 'Activo',  vence: '2026-01-20' },
    { id: 'C-0044', cliente: 'Delta Holding',       monto: '$230,000', estado: 'En Mora', vence: '2025-03-10' },
    { id: 'C-0045', cliente: 'Épsilon Fondos',      monto: '$675,000', estado: 'Activo',  vence: '2025-12-31' },
  ];

  getBadgeVariant(estado: string): BadgeVariant {
    const map: Record<string, BadgeVariant> = {
      'Activo':  'success',
      'Vencido': 'warning',
      'En Mora': 'danger',
    };
    return map[estado] ?? 'secondary';
  }

  // ── Paleta de colores del design system ───────────────────
  readonly tokens = [
    { name: '--color-primary',        label: 'Primary'       },
    { name: '--color-primary-medium', label: 'Primary Medium' },
    { name: '--color-success-bs',     label: 'Success'       },
    { name: '--color-warning-bs',     label: 'Warning'       },
    { name: '--color-danger-bs',      label: 'Danger'        },
    { name: '--color-info',           label: 'Info'          },
    { name: '--color-purple',         label: 'Purple'        },
    { name: '--color-slate-500',      label: 'Slate 500'     },
  ];

  // ── Toasts ────────────────────────────────────────────────
  showToast(type: 'success' | 'error' | 'warning' | 'info'): void {
    const messages = {
      success: { title: 'Operación exitosa',  msg: 'El contrato fue guardado correctamente.' },
      error:   { title: 'Error',              msg: 'No se pudo conectar con el servidor.'    },
      warning: { title: 'Advertencia',        msg: 'Hay campos sin completar en el formulario.' },
      info:    { title: 'Información',        msg: 'Los datos se actualizan cada 5 minutos.' },
    };
    this.toastr[type](messages[type].msg, messages[type].title);
  }

  // ── Alert demo ────────────────────────────────────────────
  alertDismissed = signal(false);

  // ── Formulario reactivo demo ──────────────────────────────
  readonly demoForm = this.fb.group({
    cliente:          ['', Validators.required],
    tipoContrato:     ['', Validators.required],
    monto:            [null as number | null],
    fechaVencimiento: [null as Date | null],
    estado:           ['Activo'],
    notificaciones:   [true],
  });

  readonly tiposContrato: SelectOption[] = [
    { value: 'credito',       label: 'Crédito Simple'      },
    { value: 'arrendamiento', label: 'Arrendamiento'       },
    { value: 'pasivo',        label: 'Pasivo Contingente'  },
    { value: 'factoraje',     label: 'Factoraje'           },
  ];

  readonly estadosOptions: SelectOption[] = [
    { value: 'Activo',  label: 'Activo'  },
    { value: 'Vencido', label: 'Vencido' },
    { value: 'En Mora', label: 'En Mora' },
  ];

  formSaving = signal(false);

  onDemoSubmit(): void {
    this.demoForm.markAllAsTouched();
    if (this.demoForm.invalid) return;
    this.formSaving.set(true);
    setTimeout(() => {
      this.formSaving.set(false);
      this.toastr.success('Contrato guardado correctamente.', 'Éxito');
    }, 1800);
  }
}
