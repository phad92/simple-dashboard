import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    Provider360Service,
    ProviderData,
    ProviderDemographics,
    SubmissionMetrics,
    PaymentMetrics,
    AuditMetrics,
    MemberMetrics,
    RatingMetrics,
    BenchmarkMetrics
} from '../../services/provider360.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-provider360',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        ButtonModule,
        DropdownModule,
        ProgressBarModule,
        CardModule
    ],
    templateUrl: './provider360.component.html'
})
export class Provider360Component implements OnInit {
    private provider360Service = inject(Provider360Service);

    currentDate = '';
    lastUpdated = '';
    selectedProvider: string = 'KBTH001';

    providersList: { id: string; name: string }[] = [];
    providerData!: ProviderData;

    ngOnInit() {
        this.updateDateTime();
        this.loadData();
    }

    private updateDateTime() {
        const now = new Date();
        this.currentDate = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        this.lastUpdated = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    private loadData() {
        this.providersList = this.provider360Service.getProvidersList();
        this.providerData = this.provider360Service.getProviderData();
    }

    onProviderChange() {
        this.loadData();
    }

    get demographics(): ProviderDemographics {
        return this.providerData?.demographics;
    }

    get submissions(): SubmissionMetrics {
        return this.providerData?.submissions;
    }

    get payment(): PaymentMetrics {
        return this.providerData?.payment;
    }

    get audit(): AuditMetrics {
        return this.providerData?.audit;
    }

    get members(): MemberMetrics {
        return this.providerData?.members;
    }

    get rating(): RatingMetrics {
        return this.providerData?.rating;
    }

    get benchmarks(): BenchmarkMetrics {
        return this.providerData?.benchmarks;
    }

    formatCurrency(amount: number): string {
        return this.provider360Service.formatCurrency(amount);
    }

    formatDate(date: Date): string {
        return this.provider360Service.formatDate(date);
    }

    getDaysToExpiryClass(days: number): string {
        return this.provider360Service.getDaysToExpiryClass(days);
    }

    getPerformanceClass(vetting: number, payment: number): string {
        if (vetting <= 10 && payment <= 5) return 'excellent';
        if (vetting <= 15 && payment <= 7) return 'good';
        return 'needs-improvement';
    }

    getOnTimeClass(rating: number): string {
        if (rating >= 90) return 'excellent';
        if (rating >= 75) return 'good';
        return 'needs-improvement';
    }
}
