import { Component, Input } from '@angular/core';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gauge',
  standalone: true,
  imports: [KnobModule, FormsModule],
  template: `
    <div class="flex flex-col items-center mb-6">
      <p-knob 
        [(ngModel)]="value" 
        [readonly]="true"
        [size]="180"
        [strokeWidth]="12"
        valueColor="#22c55e"
        rangeColor="rgba(0,0,0,0.1)"
        valueTemplate="{value}%">
      </p-knob>
      <div class="mt-2 text-sm font-medium text-slate-600">{{ label }}</div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3 p-3 bg-black/5 rounded-lg">
        <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-500">Successful Deductions</span>
          <span class="text-base font-semibold text-slate-900">{{ successCount }}</span>
        </div>
      </div>
      <div class="flex items-center gap-3 p-3 bg-black/5 rounded-lg">
        <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-500">Failed Deductions</span>
          <span class="text-base font-semibold text-slate-900">{{ failedCount }}</span>
        </div>
      </div>
    </div>
  `
})
export class GaugeComponent {
  @Input() value = 85;
  @Input() label = 'Success Rate';
  @Input() successCount = '7,261';
  @Input() failedCount = '1,281';
}
