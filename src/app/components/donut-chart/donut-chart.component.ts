import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartData } from '../../services/dashboard.service';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [ChartModule],
  template: `
    <div class="relative flex justify-center items-center mb-6">
      <p-chart type="doughnut" [data]="chartData" [options]="chartOptions" [style]="{'width': size + 'px', 'height': size + 'px'}"></p-chart>
      <div class="absolute flex flex-col items-center pointer-events-none">
        <span class="text-xl font-bold text-slate-900">{{ total }}</span>
        <span class="text-xs text-slate-500">{{ label }}</span>
      </div>
    </div>
    <div class="chart-legend">
      @for (item of data; track item.label) {
        <div class="legend-item">
          <span class="legend-color" [style.background]="item.color"></span>
          <span>{{ item.label }}</span>
        </div>
      }
    </div>
  `
})
export class DonutChartComponent implements OnInit {
  @Input() data: ChartData[] = [];
  @Input() total = '';
  @Input() label = 'Total';
  @Input() size = 200;

  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.initChart();
  }

  private initChart() {
    this.chartData = {
      labels: this.data.map(d => d.label || ''),
      datasets: [
        {
          data: this.data.map(d => d.value),
          backgroundColor: this.data.map(d => d.color),
          borderWidth: 0,
          hoverOffset: 8
        }
      ]
    };

    this.chartOptions = {
      cutout: '65%',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          cornerRadius: 8
        }
      },
      layout: {
        padding: 12
      },
      animation: {
        animateRotate: true,
        duration: 1000
      }
    };
  }
}
