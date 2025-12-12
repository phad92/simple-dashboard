import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import * as L from 'leaflet';
import {
    ExecutiveDashboardService,
    ProviderMetrics,
    SubmissionMetrics,
    PaymentMetrics,
    MedicinesMetrics,
    MembershipMetrics,
    ServicesMetrics,
    ClaimsMetrics
} from '../../services/executive-dashboard.service';

// Fix Leaflet default icon path issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

@Component({
    selector: 'app-executive-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        ChartModule,
        ButtonModule,
        CardModule,
        DropdownModule,
        ProgressBarModule,
        TableModule,
        TabViewModule,
        TagModule
    ],
    templateUrl: './executive-dashboard.component.html'
})
export class ExecutiveDashboardComponent implements OnInit, AfterViewInit {
    private executiveService = inject(ExecutiveDashboardService);
    private map: L.Map | null = null;

    currentDate = '';
    lastUpdated = '';

    // Filter options
    timePeriodOptions = [
        { label: 'This Month', value: 'month' },
        { label: 'This Quarter', value: 'quarter' },
        { label: 'This Year', value: 'year' },
        { label: 'Last 12 Months', value: '12months' },
        { label: 'Custom Range', value: 'custom' }
    ];

    regionOptions = [
        { label: 'All Regions', value: 'all' },
        { label: 'Greater Accra', value: 'greater-accra' },
        { label: 'Ashanti', value: 'ashanti' },
        { label: 'Western', value: 'western' },
        { label: 'Eastern', value: 'eastern' },
        { label: 'Central', value: 'central' },
        { label: 'Northern', value: 'northern' },
        { label: 'Volta', value: 'volta' },
        { label: 'Upper East', value: 'upper-east' },
        { label: 'Upper West', value: 'upper-west' }
    ];

    facilityTypeOptions = [
        { label: 'All Facilities', value: 'all' },
        { label: 'Hospitals', value: 'hospitals' },
        { label: 'Clinics', value: 'clinics' },
        { label: 'Pharmacies', value: 'pharmacies' },
        { label: 'Labs', value: 'labs' },
        { label: 'CHPS', value: 'chps' }
    ];

    // Selected filter values
    selectedTimePeriod = 'year';
    selectedRegion = 'all';
    selectedFacilityType = 'all';

    // Data properties
    providerMetrics!: ProviderMetrics;
    submissionMetrics!: SubmissionMetrics;
    paymentMetrics!: PaymentMetrics;
    medicinesMetrics!: MedicinesMetrics;
    membershipMetrics!: MembershipMetrics;
    servicesMetrics!: ServicesMetrics;
    claimsMetrics!: ClaimsMetrics;

    // Chart data
    facilityTypeChartData: any;
    facilityTypeChartOptions: any;
    submissionsTrendChartData: any;
    submissionsTrendChartOptions: any;
    adjustmentReasonsChartData: any;
    adjustmentReasonsChartOptions: any;
    claimsCategoryChartData: any;
    claimsCategoryChartOptions: any;
    utilizationTrendChartData: any;
    utilizationTrendChartOptions: any;
    antibioticTrendChartData: any;
    antibioticTrendChartOptions: any;
    opdIpdChartData: any;
    opdIpdChartOptions: any;
    deliveriesChartData: any;
    deliveriesChartOptions: any;

    ngOnInit() {
        this.updateDateTime();
        this.loadData();
        this.initCharts();
    }

    ngAfterViewInit() {
        // Map will be initialized when the tab is shown via refreshMap()
    }

    private initMap() {
        const mapContainer = document.getElementById('provider-map');
        if (!mapContainer) return;

        // Destroy existing map if it exists
        if (this.map) {
            this.map.remove();
            this.map = null;
        }

        // Center on Ghana
        this.map = L.map('provider-map', {
            center: [7.9465, -1.0232],
            zoom: 7,
            scrollWheelZoom: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Add regional markers with provider data
        this.addRegionalMarkers();
    }

    private addRegionalMarkers() {
        if (!this.map || !this.providerMetrics) return;

        // Ghana regional coordinates (approximate centers) - All 16 regions
        const regionCoords: { [key: string]: [number, number] } = {
            'Greater Accra': [5.6037, -0.1870],
            'Ashanti': [6.6885, -1.6244],
            'Western': [5.0527, -2.1927],
            'Western North': [6.0800, -2.4200],
            'Eastern': [6.1016, -0.2665],
            'Central': [5.4221, -1.0876],
            'Volta': [6.5781, 0.4502],
            'Oti': [7.8000, 0.3000],
            'Northern': [9.4007, -0.8393],
            'North East': [10.5100, -0.2500],
            'Savannah': [9.0000, -1.8000],
            'Upper East': [10.7852, -0.8593],
            'Upper West': [10.2530, -2.1410],
            'Bono': [7.5000, -2.3000],
            'Bono East': [7.7500, -1.0500],
            'Ahafo': [7.0000, -2.3500]
        };

        this.providerMetrics.regionalData.forEach(region => {
            const coords = regionCoords[region.region];
            if (coords) {
                // Create circle marker with size based on provider count
                const radius = Math.sqrt(region.providers) * 100;
                const color = this.getMarkerColor(region.intensity);

                const circle = L.circleMarker(coords, {
                    radius: Math.min(Math.max(radius / 50, 10), 30),
                    fillColor: color,
                    color: color,
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.5
                }).addTo(this.map!);

                // Add popup with provider info
                circle.bindPopup(`
                    <div style="text-align: center; min-width: 120px;">
                        <strong style="font-size: 14px;">${region.region}</strong><br>
                        <span style="font-size: 18px; font-weight: bold; color: ${color};">${region.providers.toLocaleString()}</span><br>
                        <span style="font-size: 12px; color: #666;">Providers</span><br>
                        <span style="font-size: 11px; color: #10b981;">+${region.newProviders} new</span>
                    </div>
                `);
            }
        });
    }

    private getMarkerColor(intensity: string): string {
        const colorMap: { [key: string]: string } = {
            'low': '#10b981',
            'medium': '#f59e0b',
            'high': '#f97316',
            'critical': '#ef4444'
        };
        return colorMap[intensity] || '#6366f1';
    }

    // Method to refresh map when tab is activated
    refreshMap() {
        // Use a longer delay to ensure the tab content is fully rendered
        setTimeout(() => {
            if (!this.map) {
                this.initMap();
            }
            // Always try to invalidate size even after init
            setTimeout(() => {
                this.map?.invalidateSize();
            }, 200);
        }, 100);
    }

    // Handle tab changes - Provider Map is at index 1
    onTabChange(index: number) {
        if (index === 1) {  // Provider Map tab
            this.refreshMap();
        }
    }

    private updateDateTime() {
        const now = new Date();
        this.currentDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        this.lastUpdated = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    private loadData() {
        this.providerMetrics = this.executiveService.getProviderMetrics();
        this.submissionMetrics = this.executiveService.getSubmissionMetrics();
        this.paymentMetrics = this.executiveService.getPaymentMetrics();
        this.medicinesMetrics = this.executiveService.getMedicinesMetrics();
        this.membershipMetrics = this.executiveService.getMembershipMetrics();
        this.servicesMetrics = this.executiveService.getServicesMetrics();
        this.claimsMetrics = this.executiveService.getClaimsMetrics();
    }

    private initCharts() {
        this.initFacilityTypeChart();
        this.initSubmissionsTrendChart();
        this.initAdjustmentReasonsChart();
        this.initClaimsCategoryChart();
        this.initUtilizationTrendChart();
        this.initAntibioticTrendChart();
        this.initOpdIpdChart();
        this.initDeliveriesChart();
    }

    private initFacilityTypeChart() {
        this.facilityTypeChartData = {
            labels: this.providerMetrics.facilityTypes.map(f => f.type),
            datasets: [{
                data: this.providerMetrics.facilityTypes.map(f => f.count),
                backgroundColor: this.providerMetrics.facilityTypes.map(f => f.color),
                borderWidth: 0,
                hoverOffset: 8
            }]
        };

        this.facilityTypeChartOptions = {
            cutout: '60%',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8
                }
            }
        };
    }

    private initSubmissionsTrendChart() {
        this.submissionsTrendChartData = {
            labels: this.submissionMetrics.monthlySubmissions.map(m => m.month),
            datasets: [
                {
                    label: 'Actual',
                    data: this.submissionMetrics.monthlySubmissions.map(m => m.actual),
                    backgroundColor: '#6366f1',
                    borderRadius: 4
                },
                {
                    label: 'Expected',
                    data: this.submissionMetrics.monthlySubmissions.map(m => m.expected),
                    backgroundColor: 'rgba(99, 102, 241, 0.3)',
                    borderRadius: 4
                }
            ]
        };

        this.submissionsTrendChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { usePointStyle: true, padding: 15 }
                }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        };
    }

    private initAdjustmentReasonsChart() {
        this.adjustmentReasonsChartData = {
            labels: this.submissionMetrics.topAdjustmentReasons.map(r => r.reason),
            datasets: [{
                data: this.submissionMetrics.topAdjustmentReasons.map(r => r.count),
                backgroundColor: this.submissionMetrics.topAdjustmentReasons.map(r => r.color),
                borderWidth: 0
            }]
        };

        this.adjustmentReasonsChartOptions = {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                y: {
                    grid: { display: false }
                }
            }
        };
    }

    private initClaimsCategoryChart() {
        this.claimsCategoryChartData = {
            labels: this.claimsMetrics.claimsByCategory.map(c => c.category),
            datasets: [{
                data: this.claimsMetrics.claimsByCategory.map(c => c.claims),
                backgroundColor: this.claimsMetrics.claimsByCategory.map(c => c.color),
                borderWidth: 0,
                hoverOffset: 8
            }]
        };

        this.claimsCategoryChartOptions = {
            cutout: '60%',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        };
    }

    private initUtilizationTrendChart() {
        this.utilizationTrendChartData = {
            labels: this.claimsMetrics.utilizationTrends.map(u => u.month),
            datasets: [
                {
                    label: 'Utilization Rate (%)',
                    data: this.claimsMetrics.utilizationTrends.map(u => u.utilizationRate),
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Active Members (%)',
                    data: this.claimsMetrics.utilizationTrends.map(u => u.activePercentage),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        };

        this.utilizationTrendChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { usePointStyle: true, padding: 15 }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        };
    }

    private initAntibioticTrendChart() {
        this.antibioticTrendChartData = {
            labels: this.medicinesMetrics.antibioticTrend.map(a => a.month),
            datasets: [{
                label: 'Rate per 1000 encounters',
                data: this.medicinesMetrics.antibioticTrend.map(a => a.rate),
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#f59e0b'
            }]
        };

        this.antibioticTrendChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        };
    }

    private initOpdIpdChart() {
        this.opdIpdChartData = {
            labels: ['OPD', 'IPD'],
            datasets: [{
                data: [this.claimsMetrics.opdClaimsPercentage, this.claimsMetrics.ipdClaimsPercentage],
                backgroundColor: ['#06b6d4', '#ec4899'],
                borderWidth: 0,
                hoverOffset: 8
            }]
        };

        this.opdIpdChartOptions = {
            cutout: '65%',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        };
    }

    private initDeliveriesChart() {
        // Filter out partial year data for accurate trend display
        const deliveriesData = this.claimsMetrics.deliveries.filter(d => d.year < 2025);

        this.deliveriesChartData = {
            labels: deliveriesData.map(d => d.year.toString()),
            datasets: [{
                label: 'Deliveries',
                data: deliveriesData.map(d => d.count),
                backgroundColor: '#8b5cf6',
                borderRadius: 6
            }]
        };

        this.deliveriesChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        };
    }

    // Utility methods
    formatCurrency(amount: number): string {
        return this.executiveService.formatCurrency(amount);
    }

    formatNumber(num: number): string {
        return this.executiveService.formatNumber(num);
    }

    formatDate(date: Date): string {
        return this.executiveService.formatDate(date);
    }

    getIntensityClass(intensity: string): string {
        return this.executiveService.getIntensityClass(intensity);
    }

    getVarianceClass(): string {
        return this.providerMetrics.distributionVariance === 'high'
            ? 'text-amber-600 bg-amber-50'
            : 'text-emerald-600 bg-emerald-50';
    }

    getPerformanceStatusClass(): string {
        const status = this.paymentMetrics.performanceStatus;
        const classMap: { [key: string]: string } = {
            'excellent': 'text-emerald-700 bg-emerald-50 border-emerald-200',
            'good': 'text-amber-700 bg-amber-50 border-amber-200',
            'needs-improvement': 'text-red-700 bg-red-50 border-red-200'
        };
        return classMap[status] || '';
    }

    getProgressClass(percentage: number): string {
        if (percentage >= 90) return 'emerald';
        if (percentage >= 70) return 'amber';
        return 'red';
    }

    getTotalAdjustments(): number {
        return this.submissionMetrics.topAdjustmentReasons.reduce((sum, r) => sum + r.count, 0);
    }
}
