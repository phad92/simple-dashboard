import { Injectable } from '@angular/core';

export interface KpiData {
    icon: string;
    iconClass: string;
    label: string;
    value: number;
    prefix?: string;
    change: string;
    changeType: 'positive' | 'negative';
}

export interface MemberStatus {
    status: string;
    statusClass: string;
    value: number;
    percent: string;
}

export interface ChartData {
    value: number;
    color: string;
    label?: string;
}

export interface ChannelData {
    name: string;
    iconClass: string;
    transactions: string;
    amount: string;
    percent: string;
}

export interface ClaimBarData {
    type: string;
    barClass: string;
    count: number;
    width: string;
    amount: string;
}

export interface ArrearsItem {
    age: string;
    width: string;
    fillClass: string;
    amount: string;
}

export interface FinancialItem {
    type: string;
    label: string;
    value: string;
    valueClass?: string;
}

@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    getKpiData(): KpiData[] {
        return [
            {
                icon: 'members',
                iconClass: 'members',
                label: 'Total Members',
                value: 24856,
                change: '+12.5% from last month',
                changeType: 'positive'
            },
            {
                icon: 'premium',
                iconClass: 'premium',
                label: 'Premium Collected',
                value: 2458000,
                prefix: 'GH₵',
                change: '+8.3% from last month',
                changeType: 'positive'
            },
            {
                icon: 'claims',
                iconClass: 'claims',
                label: 'Total Claims',
                value: 3842,
                change: '+5.2% from last month',
                changeType: 'negative'
            },
            {
                icon: 'payments',
                iconClass: 'payments',
                label: 'Provider Payments',
                value: 1875000,
                prefix: 'GH₵',
                change: '+6.7% from last month',
                changeType: 'positive'
            }
        ];
    }

    getMemberStatus(): MemberStatus[] {
        return [
            { status: 'Active', statusClass: 'active-status', value: 18542, percent: '74.6%' },
            { status: 'Inactive', statusClass: 'inactive-status', value: 3214, percent: '12.9%' },
            { status: 'Suspended', statusClass: 'suspended-status', value: 1856, percent: '7.5%' },
            { status: 'Deceased', statusClass: 'deceased-status', value: 524, percent: '2.1%' },
            { status: 'Retired', statusClass: 'retired-status', value: 720, percent: '2.9%' }
        ];
    }

    getGenderData(): ChartData[] {
        return [
            { value: 56.8, color: '#06b6d4', label: 'Male: 14,125 (56.8%)' },
            { value: 43.2, color: '#ec4899', label: 'Female: 10,731 (43.2%)' }
        ];
    }

    getMemberTypeData(): ChartData[] {
        return [
            { value: 38.4, color: '#8b5cf6', label: 'Principals: 9,542 (38.4%)' },
            { value: 61.6, color: '#f59e0b', label: 'Dependants: 15,314 (61.6%)' }
        ];
    }

    getClaimsStatusData(): ChartData[] {
        return [
            { value: 89.9, color: '#10b981', label: 'Approved: 3,456 (89.9%)' },
            { value: 10.1, color: '#ef4444', label: 'Declined: 386 (10.1%)' }
        ];
    }

    getChannelData(): ChannelData[] {
        return [
            { name: 'Payroll Deduction', iconClass: 'payroll', transactions: '8,542 transactions', amount: 'GH₵ 1,425,800', percent: '58.0%' },
            { name: 'Momo Payment', iconClass: 'momo', transactions: '5,128 transactions', amount: 'GH₵ 612,400', percent: '24.9%' },
            { name: 'Bank Transfer', iconClass: 'bank', transactions: '1,854 transactions', amount: 'GH₵ 325,600', percent: '13.2%' },
            { name: 'Cash', iconClass: 'cash', transactions: '642 transactions', amount: 'GH₵ 94,200', percent: '3.8%' }
        ];
    }

    getClaimsByType(): ClaimBarData[] {
        return [
            { type: 'OPD Claims', barClass: 'opd', count: 1542, width: '40.1%', amount: 'GH₵ 425,800' },
            { type: 'IPD Claims', barClass: 'ipd', count: 856, width: '22.3%', amount: 'GH₵ 685,200' },
            { type: 'Medicines', barClass: 'medicines', count: 982, width: '25.6%', amount: 'GH₵ 312,420' },
            { type: 'Labs', barClass: 'labs', count: 462, width: '12%', amount: 'GH₵ 152,000' }
        ];
    }

    getArrearsData(): ArrearsItem[] {
        return [
            { age: '0-30 Days', width: '35%', fillClass: 'age-30', amount: 'GH₵ 160,517' },
            { age: '31-60 Days', width: '28%', fillClass: 'age-60', amount: 'GH₵ 128,414' },
            { age: '61-90 Days', width: '22%', fillClass: 'age-90', amount: 'GH₵ 100,896' },
            { age: '90+ Days', width: '15%', fillClass: 'age-over', amount: 'GH₵ 68,793' }
        ];
    }

    getFinancialSummary(): FinancialItem[] {
        return [
            { type: 'income', label: 'Total Income', value: 'GH₵ 2,916,620' },
            { type: 'expense', label: 'Total Expenses', value: 'GH₵ 2,218,000' },
            { type: 'net', label: 'Net Balance', value: 'GH₵ 698,620', valueClass: 'positive' },
            { type: 'reserves', label: 'Reserves', value: 'GH₵ 1,245,800' }
        ];
    }

    getTrendData(): number[] {
        return [120, 150, 180, 140, 200, 175, 220, 195, 240, 210, 280, 260];
    }

    formatNumber(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
