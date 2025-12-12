import { Injectable } from '@angular/core';

// ============================================
// Provider Metrics Interfaces
// ============================================
export interface FacilityTypeData {
    type: string;
    count: number;
    color: string;
}

export interface RegionalHeatmapData {
    region: string;
    providers: number;
    newProviders: number;
    intensity: 'low' | 'medium' | 'high' | 'critical';
}

export interface DistrictHeatmapData {
    district: string;
    region: string;
    providers: number;
    intensity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ProviderMetrics {
    totalActiveProviders: number;
    totalNewProviders: number;
    newProvidersPercentage: number;
    facilityTypes: FacilityTypeData[];
    regionalData: RegionalHeatmapData[];
    districtData: DistrictHeatmapData[];
    distributionVariance: 'high' | 'low';
    varianceCoefficient: number;
}

// ============================================
// Submissions & Vetting Interfaces
// ============================================
export interface TodaySubmissions {
    volume: number;
    cost: number;
    onlinePercentage: number;
    offlinePercentage: number;
}

export interface MonthlySubmission {
    month: string;
    actual: number;
    expected: number;
    percentage: number;
}

export interface AdjustmentReason {
    reason: string;
    count: number;
    percentage: number;
    color: string;
}

export interface SubmissionMetrics {
    todaySubmissions: TodaySubmissions;
    monthlySubmissions: MonthlySubmission[];
    ytdVolume: number;
    ytdCost: number;
    yearLabel: string;
    claimsProcessedPercentage: number;
    topAdjustmentReasons: AdjustmentReason[];
    absoluteAdjustments12Months: number[];
    adjustmentPercentage: number;
}

// ============================================
// Payment Metrics Interfaces
// ============================================
export interface BatchPayment {
    batchId: string;
    date: Date;
    amount: number;
    providerCount: number;
}

export interface YearlyBatchData {
    yearRange: string;
    paidBatches: number;
    pendingBatches: number;
    paidPercentage: number;
}

export interface PaymentMetrics {
    lastPaymentDate: Date;
    batchesPaid: number;
    amountsPaid: number;
    recentBatches: BatchPayment[];
    avgVettingTimeDays: number;
    avgPaymentTimeDays: number;
    performanceStatus: 'excellent' | 'good' | 'needs-improvement';
    yearlyBatchData: YearlyBatchData[];
    avgPaymentTimeMonths: number;
}

// ============================================
// Medicines Metrics Interfaces
// ============================================
export interface MedicineData {
    rank: number;
    name: string;
    frequency: number;
    cost: number;
    therapeuticClass: string;
}

export interface TherapeuticClassData {
    rank: number;
    className: string;
    frequency: number;
    cost: number;
}

export interface AntibioticAgeData {
    ageGroup: string;
    count: number;
    percentage: number;
}

export interface AntibioticUtilizationData {
    rank: number;
    name: string;
    ageGroups: AntibioticAgeData[];
}

export interface MedicinesMetrics {
    top10MedicinesByFreq: MedicineData[];
    top10TherapeuticByFreq: TherapeuticClassData[];
    top10MedicinesByCost: MedicineData[];
    top10TherapeuticByCost: TherapeuticClassData[];
    lastMedicineReviewDate: Date;
    totalMedicinesOnML: number;
    antibioticsByAge: AntibioticUtilizationData[];
    opdAntibioticRate: number;  // per 1000 encounters
    ipdAntibioticRate: number;  // per 1000 encounters
    antibioticTrend: { month: string; rate: number }[];
}

// ============================================
// Membership Metrics Interfaces
// ============================================
export interface RegionalRenewal {
    region: string;
    totalMembers: number;
    renewedMembers: number;
    renewalRate: number;
    financialRiskProtection: number;
}

export interface MembershipMetrics {
    activeMembershipToday: number;
    totalMembership: number;
    annualActiveMembers: number;
    annualActivePercentage: number;
    regionalRenewals: RegionalRenewal[];
    lowestRiskProtectionRegion: string;
    lowestRiskProtectionDistrict: string;
}

// ============================================
// Services Metrics Interfaces
// ============================================
export interface GDRGData {
    rank: number;
    code: string;
    description: string;
    frequency: number;
    cost: number;
    costContribution: number;
}

export interface ServicesMetrics {
    top10OPDGDRGs: GDRGData[];
    top10IPDGDRGs: GDRGData[];
    totalOPDServiceCost: number;
    totalIPDServiceCost: number;
}

// ============================================
// Claims Metrics Interfaces
// ============================================
export interface ClaimsByCategory {
    category: string;
    claims: number;
    percentage: number;
    color: string;
}

export interface UtilizationTrend {
    month: string;
    utilizationRate: number;
    activePercentage: number;
}

export interface ClaimsVariation {
    month: string;
    currentYear: number;
    previousYear: number;
    variation: number;
    direction: 'increase' | 'decrease';
}

export interface DeliveryData {
    year: number;
    count: number;
    change: number;
}

export interface ClaimsMetrics {
    opdClaimsPercentage: number;
    ipdClaimsPercentage: number;
    claimsByCategory: ClaimsByCategory[];
    utilizationByTotalMembership: number;
    utilizationByActivePercentage: number;
    utilizationTrends: UtilizationTrend[];
    claimsVariations: ClaimsVariation[];
    deliveries: DeliveryData[];
}

@Injectable({
    providedIn: 'root'
})
export class ExecutiveDashboardService {

    // ============================================
    // Provider Metrics
    // ============================================
    getProviderMetrics(): ProviderMetrics {
        return {
            totalActiveProviders: 4582,
            totalNewProviders: 342,
            newProvidersPercentage: 7.5,
            facilityTypes: [
                { type: 'Hospitals', count: 485, color: '#6366f1' },
                { type: 'Clinics', count: 1256, color: '#06b6d4' },
                { type: 'Pharmacies', count: 1842, color: '#10b981' },
                { type: 'Labs', count: 524, color: '#f59e0b' },
                { type: 'CHPS', count: 475, color: '#ec4899' }
            ],
            regionalData: [
                { region: 'Greater Accra', providers: 1245, newProviders: 98, intensity: 'critical' },
                { region: 'Ashanti', providers: 856, newProviders: 65, intensity: 'high' },
                { region: 'Western', providers: 423, newProviders: 32, intensity: 'medium' },
                { region: 'Western North', providers: 186, newProviders: 14, intensity: 'low' },
                { region: 'Eastern', providers: 398, newProviders: 28, intensity: 'medium' },
                { region: 'Central', providers: 356, newProviders: 24, intensity: 'medium' },
                { region: 'Volta', providers: 285, newProviders: 18, intensity: 'low' },
                { region: 'Oti', providers: 145, newProviders: 12, intensity: 'low' },
                { region: 'Northern', providers: 312, newProviders: 22, intensity: 'low' },
                { region: 'North East', providers: 124, newProviders: 10, intensity: 'low' },
                { region: 'Savannah', providers: 156, newProviders: 11, intensity: 'low' },
                { region: 'Upper East', providers: 198, newProviders: 15, intensity: 'low' },
                { region: 'Upper West', providers: 165, newProviders: 12, intensity: 'low' },
                { region: 'Bono', providers: 244, newProviders: 18, intensity: 'medium' },
                { region: 'Bono East', providers: 198, newProviders: 14, intensity: 'low' },
                { region: 'Ahafo', providers: 156, newProviders: 11, intensity: 'low' }
            ],
            districtData: [
                { district: 'Accra Metro', region: 'Greater Accra', providers: 542, intensity: 'critical' },
                { district: 'Kumasi Metro', region: 'Ashanti', providers: 423, intensity: 'high' },
                { district: 'Tema', region: 'Greater Accra', providers: 312, intensity: 'high' },
                { district: 'Sekondi-Takoradi', region: 'Western', providers: 198, intensity: 'medium' },
                { district: 'Cape Coast', region: 'Central', providers: 156, intensity: 'medium' }
            ],
            distributionVariance: 'high',
            varianceCoefficient: 0.68
        };
    }

    // ============================================
    // Submissions & Vetting Metrics
    // ============================================
    getSubmissionMetrics(): SubmissionMetrics {
        return {
            todaySubmissions: {
                volume: 2847,
                cost: 4256890,
                onlinePercentage: 78.5,
                offlinePercentage: 21.5
            },
            monthlySubmissions: [
                { month: 'Jan', actual: 85420, expected: 95000, percentage: 89.9 },
                { month: 'Feb', actual: 78560, expected: 90000, percentage: 87.3 },
                { month: 'Mar', actual: 92340, expected: 95000, percentage: 97.2 },
                { month: 'Apr', actual: 88760, expected: 92000, percentage: 96.5 },
                { month: 'May', actual: 91250, expected: 95000, percentage: 96.1 },
                { month: 'Jun', actual: 86420, expected: 90000, percentage: 96.0 },
                { month: 'Jul', actual: 94560, expected: 98000, percentage: 96.5 },
                { month: 'Aug', actual: 89340, expected: 95000, percentage: 94.0 },
                { month: 'Sep', actual: 87650, expected: 92000, percentage: 95.3 },
                { month: 'Oct', actual: 93420, expected: 96000, percentage: 97.3 },
                { month: 'Nov', actual: 88950, expected: 94000, percentage: 94.6 },
                { month: 'Dec', actual: 45620, expected: 95000, percentage: 48.0 }
            ],
            ytdVolume: 1022290,
            ytdCost: 2458650000,
            yearLabel: '2025',
            claimsProcessedPercentage: 94.2,
            topAdjustmentReasons: [
                { reason: 'Documentation Error', count: 8542, percentage: 32.5, color: '#ef4444' },
                { reason: 'Tariff Mismatch', count: 5621, percentage: 21.4, color: '#f59e0b' },
                { reason: 'Duplicate Claim', count: 4856, percentage: 18.5, color: '#6366f1' },
                { reason: 'Invalid Procedure', count: 3924, percentage: 14.9, color: '#06b6d4' },
                { reason: 'Expired Authorization', count: 3312, percentage: 12.6, color: '#10b981' }
            ],
            absoluteAdjustments12Months: [245, 312, 289, 356, 324, 298, 342, 385, 356, 412, 378, 345],
            adjustmentPercentage: 8.4
        };
    }

    // ============================================
    // Payment Metrics
    // ============================================
    getPaymentMetrics(): PaymentMetrics {
        return {
            lastPaymentDate: new Date(2025, 11, 10),
            batchesPaid: 156,
            amountsPaid: 1875420000,
            recentBatches: [
                { batchId: 'BTH-2025-156', date: new Date(2025, 11, 10), amount: 42580000, providerCount: 245 },
                { batchId: 'BTH-2025-155', date: new Date(2025, 11, 5), amount: 38750000, providerCount: 212 },
                { batchId: 'BTH-2025-154', date: new Date(2025, 10, 28), amount: 45620000, providerCount: 268 },
                { batchId: 'BTH-2025-153', date: new Date(2025, 10, 20), amount: 41250000, providerCount: 234 },
                { batchId: 'BTH-2025-152', date: new Date(2025, 10, 15), amount: 39840000, providerCount: 228 }
            ],
            avgVettingTimeDays: 8,
            avgPaymentTimeDays: 4,
            performanceStatus: 'excellent',
            yearlyBatchData: [
                { yearRange: '2021-2022', paidBatches: 285, pendingBatches: 12, paidPercentage: 96.0 },
                { yearRange: '2022-2023', paidBatches: 312, pendingBatches: 18, paidPercentage: 94.5 },
                { yearRange: '2023-2024', paidBatches: 298, pendingBatches: 24, paidPercentage: 92.5 },
                { yearRange: '2024-2025', paidBatches: 156, pendingBatches: 42, paidPercentage: 78.8 }
            ],
            avgPaymentTimeMonths: 1.2
        };
    }

    // ============================================
    // Medicines Metrics
    // ============================================
    getMedicinesMetrics(): MedicinesMetrics {
        return {
            top10MedicinesByFreq: [
                { rank: 1, name: 'Paracetamol 500mg', frequency: 125840, cost: 45620000, therapeuticClass: 'Analgesics' },
                { rank: 2, name: 'Amoxicillin 500mg', frequency: 98560, cost: 68540000, therapeuticClass: 'Antibiotics' },
                { rank: 3, name: 'Metformin 500mg', frequency: 87420, cost: 42580000, therapeuticClass: 'Antidiabetics' },
                { rank: 4, name: 'Omeprazole 20mg', frequency: 76540, cost: 38940000, therapeuticClass: 'GI Agents' },
                { rank: 5, name: 'Amlodipine 5mg', frequency: 68920, cost: 35620000, therapeuticClass: 'Antihypertensives' },
                { rank: 6, name: 'Ibuprofen 400mg', frequency: 62450, cost: 28540000, therapeuticClass: 'NSAIDs' },
                { rank: 7, name: 'Ciprofloxacin 500mg', frequency: 54820, cost: 42680000, therapeuticClass: 'Antibiotics' },
                { rank: 8, name: 'Atorvastatin 20mg', frequency: 48560, cost: 52340000, therapeuticClass: 'Statins' },
                { rank: 9, name: 'Artemether-Lumefantrine', frequency: 42680, cost: 85420000, therapeuticClass: 'Antimalarials' },
                { rank: 10, name: 'Losartan 50mg', frequency: 38540, cost: 32580000, therapeuticClass: 'Antihypertensives' }
            ],
            top10TherapeuticByFreq: [
                { rank: 1, className: 'Analgesics', frequency: 245680, cost: 85420000 },
                { rank: 2, className: 'Antibiotics', frequency: 198540, cost: 142580000 },
                { rank: 3, className: 'Antihypertensives', frequency: 156420, cost: 98540000 },
                { rank: 4, className: 'Antidiabetics', frequency: 124560, cost: 76420000 },
                { rank: 5, className: 'GI Agents', frequency: 98540, cost: 54620000 },
                { rank: 6, className: 'NSAIDs', frequency: 87420, cost: 42580000 },
                { rank: 7, className: 'Antimalarials', frequency: 76540, cost: 124580000 },
                { rank: 8, className: 'Statins', frequency: 65420, cost: 72540000 },
                { rank: 9, className: 'Antihistamines', frequency: 54620, cost: 28540000 },
                { rank: 10, className: 'Vitamins', frequency: 48560, cost: 22580000 }
            ],
            top10MedicinesByCost: [
                { rank: 1, name: 'Artemether-Lumefantrine', frequency: 42680, cost: 85420000, therapeuticClass: 'Antimalarials' },
                { rank: 2, name: 'Insulin Glargine', frequency: 12560, cost: 72580000, therapeuticClass: 'Antidiabetics' },
                { rank: 3, name: 'Amoxicillin 500mg', frequency: 98560, cost: 68540000, therapeuticClass: 'Antibiotics' },
                { rank: 4, name: 'Atorvastatin 20mg', frequency: 48560, cost: 52340000, therapeuticClass: 'Statins' },
                { rank: 5, name: 'Lisinopril 10mg', frequency: 35620, cost: 48560000, therapeuticClass: 'Antihypertensives' },
                { rank: 6, name: 'Paracetamol 500mg', frequency: 125840, cost: 45620000, therapeuticClass: 'Analgesics' },
                { rank: 7, name: 'Ciprofloxacin 500mg', frequency: 54820, cost: 42680000, therapeuticClass: 'Antibiotics' },
                { rank: 8, name: 'Metformin 500mg', frequency: 87420, cost: 42580000, therapeuticClass: 'Antidiabetics' },
                { rank: 9, name: 'Omeprazole 20mg', frequency: 76540, cost: 38940000, therapeuticClass: 'GI Agents' },
                { rank: 10, name: 'Amlodipine 5mg', frequency: 68920, cost: 35620000, therapeuticClass: 'Antihypertensives' }
            ],
            top10TherapeuticByCost: [
                { rank: 1, className: 'Antibiotics', frequency: 198540, cost: 142580000 },
                { rank: 2, className: 'Antimalarials', frequency: 76540, cost: 124580000 },
                { rank: 3, className: 'Antihypertensives', frequency: 156420, cost: 98540000 },
                { rank: 4, className: 'Analgesics', frequency: 245680, cost: 85420000 },
                { rank: 5, className: 'Antidiabetics', frequency: 124560, cost: 76420000 },
                { rank: 6, className: 'Statins', frequency: 65420, cost: 72540000 },
                { rank: 7, className: 'GI Agents', frequency: 98540, cost: 54620000 },
                { rank: 8, className: 'NSAIDs', frequency: 87420, cost: 42580000 },
                { rank: 9, className: 'Antihistamines', frequency: 54620, cost: 28540000 },
                { rank: 10, className: 'Vitamins', frequency: 48560, cost: 22580000 }
            ],
            lastMedicineReviewDate: new Date(2025, 5, 15),
            totalMedicinesOnML: 1256,
            antibioticsByAge: [
                {
                    rank: 1, name: 'Amoxicillin 500mg',
                    ageGroups: [
                        { ageGroup: '0-5', count: 12540, percentage: 18.5 },
                        { ageGroup: '6-18', count: 18560, percentage: 27.4 },
                        { ageGroup: '19-45', count: 24580, percentage: 36.3 },
                        { ageGroup: '46-65', count: 8540, percentage: 12.6 },
                        { ageGroup: '65+', count: 3520, percentage: 5.2 }
                    ]
                },
                {
                    rank: 2, name: 'Ciprofloxacin 500mg',
                    ageGroups: [
                        { ageGroup: '0-5', count: 2540, percentage: 8.2 },
                        { ageGroup: '6-18', count: 5620, percentage: 18.1 },
                        { ageGroup: '19-45', count: 14580, percentage: 47.0 },
                        { ageGroup: '46-65', count: 5840, percentage: 18.8 },
                        { ageGroup: '65+', count: 2440, percentage: 7.9 }
                    ]
                }
            ],
            opdAntibioticRate: 4.2,
            ipdAntibioticRate: 5.8,
            antibioticTrend: [
                { month: 'Jan', rate: 4.1 },
                { month: 'Feb', rate: 4.3 },
                { month: 'Mar', rate: 4.5 },
                { month: 'Apr', rate: 4.2 },
                { month: 'May', rate: 4.0 },
                { month: 'Jun', rate: 3.9 },
                { month: 'Jul', rate: 4.4 },
                { month: 'Aug', rate: 4.6 },
                { month: 'Sep', rate: 4.3 },
                { month: 'Oct', rate: 4.1 },
                { month: 'Nov', rate: 4.0 },
                { month: 'Dec', rate: 4.2 }
            ]
        };
    }

    // ============================================
    // Membership Metrics
    // ============================================
    getMembershipMetrics(): MembershipMetrics {
        return {
            activeMembershipToday: 4256890,
            totalMembership: 5842650,
            annualActiveMembers: 3985420,
            annualActivePercentage: 68.2,
            regionalRenewals: [
                { region: 'Greater Accra', totalMembers: 1245680, renewedMembers: 985420, renewalRate: 79.1, financialRiskProtection: 72.5 },
                { region: 'Ashanti', totalMembers: 985420, renewedMembers: 756890, renewalRate: 76.8, financialRiskProtection: 68.4 },
                { region: 'Western', totalMembers: 524680, renewedMembers: 398540, renewalRate: 75.9, financialRiskProtection: 65.2 },
                { region: 'Western North', totalMembers: 285420, renewedMembers: 198540, renewalRate: 69.6, financialRiskProtection: 48.5 },
                { region: 'Eastern', totalMembers: 456890, renewedMembers: 342580, renewalRate: 75.0, financialRiskProtection: 62.8 },
                { region: 'Central', totalMembers: 398540, renewedMembers: 295680, renewalRate: 74.2, financialRiskProtection: 58.4 },
                { region: 'Volta', totalMembers: 385420, renewedMembers: 278540, renewalRate: 72.3, financialRiskProtection: 52.6 },
                { region: 'Oti', totalMembers: 198540, renewedMembers: 132580, renewalRate: 66.8, financialRiskProtection: 44.2 },
                { region: 'Northern', totalMembers: 524680, renewedMembers: 356890, renewalRate: 68.0, financialRiskProtection: 45.2 },
                { region: 'North East', totalMembers: 156890, renewedMembers: 98540, renewalRate: 62.8, financialRiskProtection: 36.5 },
                { region: 'Savannah', totalMembers: 185420, renewedMembers: 118540, renewalRate: 63.9, financialRiskProtection: 39.8 },
                { region: 'Upper East', totalMembers: 298540, renewedMembers: 198420, renewalRate: 66.5, financialRiskProtection: 42.8 },
                { region: 'Upper West', totalMembers: 245680, renewedMembers: 156890, renewalRate: 63.9, financialRiskProtection: 38.5 },
                { region: 'Bono', totalMembers: 342580, renewedMembers: 256890, renewalRate: 75.0, financialRiskProtection: 55.4 },
                { region: 'Bono East', totalMembers: 298540, renewedMembers: 218540, renewalRate: 73.2, financialRiskProtection: 52.8 },
                { region: 'Ahafo', totalMembers: 245680, renewedMembers: 175420, renewalRate: 71.4, financialRiskProtection: 49.5 }
            ],
            lowestRiskProtectionRegion: 'Upper West',
            lowestRiskProtectionDistrict: 'Wa West'
        };
    }

    // ============================================
    // Services Metrics
    // ============================================
    getServicesMetrics(): ServicesMetrics {
        return {
            top10OPDGDRGs: [
                { rank: 1, code: 'OPD-001', description: 'General Consultation', frequency: 524680, cost: 125840000, costContribution: 18.5 },
                { rank: 2, code: 'OPD-015', description: 'Malaria Treatment', frequency: 385420, cost: 98560000, costContribution: 14.5 },
                { rank: 3, code: 'OPD-023', description: 'Respiratory Infection', frequency: 298540, cost: 78540000, costContribution: 11.5 },
                { rank: 4, code: 'OPD-008', description: 'Hypertension Management', frequency: 265890, cost: 72540000, costContribution: 10.7 },
                { rank: 5, code: 'OPD-012', description: 'Diabetes Management', frequency: 198540, cost: 68420000, costContribution: 10.1 },
                { rank: 6, code: 'OPD-045', description: 'Antenatal Care', frequency: 175620, cost: 52840000, costContribution: 7.8 },
                { rank: 7, code: 'OPD-032', description: 'Diarrheal Disease', frequency: 156890, cost: 42580000, costContribution: 6.3 },
                { rank: 8, code: 'OPD-056', description: 'Skin Infections', frequency: 142580, cost: 38540000, costContribution: 5.7 },
                { rank: 9, code: 'OPD-067', description: 'UTI Treatment', frequency: 125840, cost: 35680000, costContribution: 5.2 },
                { rank: 10, code: 'OPD-078', description: 'Eye Infections', frequency: 98560, cost: 28540000, costContribution: 4.2 }
            ],
            top10IPDGDRGs: [
                { rank: 1, code: 'IPD-001', description: 'Normal Delivery', frequency: 145680, cost: 285420000, costContribution: 22.5 },
                { rank: 2, code: 'IPD-002', description: 'Caesarean Section', frequency: 85420, cost: 245680000, costContribution: 19.4 },
                { rank: 3, code: 'IPD-015', description: 'Severe Malaria', frequency: 75840, cost: 156890000, costContribution: 12.4 },
                { rank: 4, code: 'IPD-023', description: 'Pneumonia', frequency: 62540, cost: 124580000, costContribution: 9.8 },
                { rank: 5, code: 'IPD-034', description: 'Surgical Procedures', frequency: 48560, cost: 98540000, costContribution: 7.8 },
                { rank: 6, code: 'IPD-045', description: 'Cardiovascular Events', frequency: 35680, cost: 85420000, costContribution: 6.7 },
                { rank: 7, code: 'IPD-056', description: 'Diabetic Complications', frequency: 28540, cost: 72580000, costContribution: 5.7 },
                { rank: 8, code: 'IPD-067', description: 'Renal Conditions', frequency: 24560, cost: 65420000, costContribution: 5.2 },
                { rank: 9, code: 'IPD-078', description: 'Orthopedic Cases', frequency: 18540, cost: 52840000, costContribution: 4.2 },
                { rank: 10, code: 'IPD-089', description: 'Neonatal Care', frequency: 15680, cost: 42580000, costContribution: 3.4 }
            ],
            totalOPDServiceCost: 679540000,
            totalIPDServiceCost: 1267350000
        };
    }

    // ============================================
    // Claims Metrics
    // ============================================
    getClaimsMetrics(): ClaimsMetrics {
        return {
            opdClaimsPercentage: 72.5,
            ipdClaimsPercentage: 27.5,
            claimsByCategory: [
                { category: 'SSNIT Contributors', claims: 524680, percentage: 35.2, color: '#6366f1' },
                { category: 'Informal Sector', claims: 398540, percentage: 26.7, color: '#06b6d4' },
                { category: 'LEAP Beneficiaries', claims: 245680, percentage: 16.5, color: '#10b981' },
                { category: 'Aged (70+)', claims: 156890, percentage: 10.5, color: '#f59e0b' },
                { category: 'Under 18', claims: 124560, percentage: 8.4, color: '#ec4899' },
                { category: 'Pregnant Women', claims: 42580, percentage: 2.9, color: '#8b5cf6' }
            ],
            utilizationByTotalMembership: 25.5,
            utilizationByActivePercentage: 37.4,
            utilizationTrends: [
                { month: 'Jan', utilizationRate: 24.5, activePercentage: 36.2 },
                { month: 'Feb', utilizationRate: 23.8, activePercentage: 35.1 },
                { month: 'Mar', utilizationRate: 26.2, activePercentage: 38.5 },
                { month: 'Apr', utilizationRate: 25.8, activePercentage: 37.8 },
                { month: 'May', utilizationRate: 26.5, activePercentage: 38.9 },
                { month: 'Jun', utilizationRate: 24.2, activePercentage: 35.6 },
                { month: 'Jul', utilizationRate: 27.1, activePercentage: 39.8 },
                { month: 'Aug', utilizationRate: 26.8, activePercentage: 39.4 },
                { month: 'Sep', utilizationRate: 25.2, activePercentage: 37.0 },
                { month: 'Oct', utilizationRate: 26.4, activePercentage: 38.8 },
                { month: 'Nov', utilizationRate: 25.8, activePercentage: 37.9 },
                { month: 'Dec', utilizationRate: 25.5, activePercentage: 37.4 }
            ],
            claimsVariations: [
                { month: 'Jan', currentYear: 524680, previousYear: 498540, variation: 5.2, direction: 'increase' },
                { month: 'Feb', currentYear: 485420, previousYear: 502680, variation: -3.4, direction: 'decrease' },
                { month: 'Mar', currentYear: 562450, previousYear: 524680, variation: 7.2, direction: 'increase' },
                { month: 'Apr', currentYear: 548920, previousYear: 512450, variation: 7.1, direction: 'increase' },
                { month: 'May', currentYear: 575680, previousYear: 545620, variation: 5.5, direction: 'increase' },
                { month: 'Jun', currentYear: 512450, previousYear: 528940, variation: -3.1, direction: 'decrease' },
                { month: 'Jul', currentYear: 598540, previousYear: 562450, variation: 6.4, direction: 'increase' },
                { month: 'Aug', currentYear: 585420, previousYear: 548920, variation: 6.6, direction: 'increase' },
                { month: 'Sep', currentYear: 542680, previousYear: 524680, variation: 3.4, direction: 'increase' },
                { month: 'Oct', currentYear: 572450, previousYear: 545620, variation: 4.9, direction: 'increase' },
                { month: 'Nov', currentYear: 558920, previousYear: 532450, variation: 5.0, direction: 'increase' },
                { month: 'Dec', currentYear: 548560, previousYear: 524680, variation: 4.6, direction: 'increase' }
            ],
            deliveries: [
                { year: 2021, count: 285420, change: 0 },
                { year: 2022, count: 298540, change: 4.6 },
                { year: 2023, count: 312680, change: 4.7 },
                { year: 2024, count: 328540, change: 5.1 },
                { year: 2025, count: 145680, change: -55.7 }  // Only partial year
            ]
        };
    }

    // ============================================
    // Utility Methods
    // ============================================
    formatCurrency(amount: number): string {
        if (amount >= 1000000000) {
            return 'GH₵ ' + (amount / 1000000000).toFixed(2) + 'B';
        } else if (amount >= 1000000) {
            return 'GH₵ ' + (amount / 1000000).toFixed(2) + 'M';
        } else if (amount >= 1000) {
            return 'GH₵ ' + (amount / 1000).toFixed(1) + 'K';
        }
        return 'GH₵ ' + amount.toLocaleString();
    }

    formatNumber(num: number): string {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    }

    formatDate(date: Date): string {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    getIntensityClass(intensity: string): string {
        const classMap: { [key: string]: string } = {
            'low': 'bg-emerald-100 text-emerald-700',
            'medium': 'bg-amber-100 text-amber-700',
            'high': 'bg-orange-100 text-orange-700',
            'critical': 'bg-red-100 text-red-700'
        };
        return classMap[intensity] || 'bg-slate-100 text-slate-700';
    }
}
