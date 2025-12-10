import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-trend-chart',
    standalone: true,
    imports: [ChartModule],
    template: `
    <div class="w-full">
      <p-chart type="line" [data]="chartData" [options]="chartOptions" [style]="{'width': '100%', 'height': height + 'px'}"></p-chart>
    </div>
  `
})
export class TrendChartComponent implements OnInit {
    @Input() data: number[] = [];
    @Input() width = 280;
    @Input() height = 100;

    chartData: any;
    chartOptions: any;

    ngOnInit() {
        this.initChart();
    }

    private initChart() {
        const labels = this.data.map((_, i) => `Month ${i + 1}`);

        this.chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Trend',
                    data: this.data,
                    fill: true,
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.2)',
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#06b6d4',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }
            ]
        };

        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
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
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 1500
            }
        };
    }
}
