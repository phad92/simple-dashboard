import { Injectable } from '@angular/core';

export interface ProviderDemographics {
    name: string;
    facilityType: string;
    ownership: string;
    region: string;
    district: string;
    credExpiryDate: Date;
    daysToExpiry: number;
    loyaltyYears: number;
}

export interface SubmissionMetrics {
    avgVolumeService: number;
    avgVolumeMedicine: number;
    avgCostService: number;
    avgCostMedicine: number;
    avgAdjustmentService: number;
    avgAdjustmentMedicine: number;
    lastSubmissionBatch: string;
    lastSubmissionDate: Date;
    totalSkippedSubmissions: number;
    avgSubmissionDays: number;
    onTimeRating: number;
}

export interface PaymentMetrics {
    lastPaymentBatch: string;
    lastPaymentAmount: number;
    lastPaymentDate: Date;
    avgVettingDays: number;
    avgPaymentDays: number;
    unpaidBatches: number;
    avgPaymentTimeMonths: number;
}

export interface AuditMetrics {
    lastAuditDate: Date | null;
    totalAuditsLast5Years: number;
    cumulativeRecovered: number;
}

export interface MemberMetrics {
    totalMembersLast1Year: number;
    avgNewMembersPerMonth: number;
    avgShareWithOtherProviders: number;
    uniqueRegionsWithShare: number;
}

export interface RatingMetrics {
    averagePublicRating: number;
}

export interface BenchmarkMetrics {
    opdToIpdSubmissions: number;
    antibioticPrescriptionRate: number;
    pendingTickets: number;
    avgIpdToOpdRatio: number;
    avgDetentionToOpdRatio: number;
}

export interface ProviderData {
    demographics: ProviderDemographics;
    submissions: SubmissionMetrics;
    payment: PaymentMetrics;
    audit: AuditMetrics;
    members: MemberMetrics;
    rating: RatingMetrics;
    benchmarks: BenchmarkMetrics;
}

@Injectable({
    providedIn: 'root'
})
export class Provider360Service {

    getProviderData(): ProviderData {
        return {
            demographics: {
                name: 'Korle-Bu Teaching Hospital',
                facilityType: 'Teaching Hospital',
                ownership: 'Government',
                region: 'Greater Accra',
                district: 'Accra Metropolitan',
                credExpiryDate: new Date('2026-03-15'),
                daysToExpiry: 94,
                loyaltyYears: 12
            },
            submissions: {
                avgVolumeService: 1542,
                avgVolumeMedicine: 3218,
                avgCostService: 245680,
                avgCostMedicine: 187420,
                avgAdjustmentService: 8.5,
                avgAdjustmentMedicine: 12.3,
                lastSubmissionBatch: 'BATCH-2025-1142',
                lastSubmissionDate: new Date('2025-12-08'),
                totalSkippedSubmissions: 3,
                avgSubmissionDays: 4.2,
                onTimeRating: 92
            },
            payment: {
                lastPaymentBatch: 'PAY-2025-0856',
                lastPaymentAmount: 1875420,
                lastPaymentDate: new Date('2025-12-05'),
                avgVettingDays: 8.5,
                avgPaymentDays: 4.2,
                unpaidBatches: 2,
                avgPaymentTimeMonths: 1.8
            },
            audit: {
                lastAuditDate: new Date('2024-06-15'),
                totalAuditsLast5Years: 4,
                cumulativeRecovered: 125600
            },
            members: {
                totalMembersLast1Year: 18542,
                avgNewMembersPerMonth: 256,
                avgShareWithOtherProviders: 34.5,
                uniqueRegionsWithShare: 8
            },
            rating: {
                averagePublicRating: 4.2
            },
            benchmarks: {
                opdToIpdSubmissions: 72.5,
                antibioticPrescriptionRate: 28.4,
                pendingTickets: 12,
                avgIpdToOpdRatio: 0.38,
                avgDetentionToOpdRatio: 0.15
            }
        };
    }

    getProvidersList(): { id: string; name: string }[] {
        return [
            { id: 'KBTH001', name: 'Korle-Bu Teaching Hospital' },
            { id: 'KATH002', name: 'Komfo Anokye Teaching Hospital' },
            { id: 'TTH003', name: 'Tamale Teaching Hospital' },
            { id: 'CCTH004', name: 'Cape Coast Teaching Hospital' },
            { id: 'RH005', name: 'Ridge Hospital' },
            { id: '37MH006', name: '37 Military Hospital' }
        ];
    }

    formatCurrency(amount: number): string {
        return 'GH₵ ' + amount.toLocaleString('en-US');
    }

    formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    getDaysToExpiryClass(days: number): string {
        if (days <= 30) return 'critical';
        if (days <= 90) return 'warning';
        return 'good';
    }
}
