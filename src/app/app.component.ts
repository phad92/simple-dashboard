import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { TrendChartComponent } from './components/trend-chart/trend-chart.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { DashboardService, KpiData, MemberStatus, ChartData, ChannelData, ClaimBarData, ArrearsItem, FinancialItem } from './services/dashboard.service';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    DonutChartComponent,
    TrendChartComponent,
    GaugeComponent,
    ButtonModule,
    ProgressBarModule,
    CardModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  currentDate = '';
  lastUpdated = '';
  activeNav = 'Overview';
  navLinks = [/** 'Overview', 'Reports', 'Members', 'Claims' **/];

  kpiData: KpiData[] = [];
  memberStatus: MemberStatus[] = [];
  genderData: ChartData[] = [];
  memberTypeData: ChartData[] = [];
  claimsStatusData: ChartData[] = [];
  channelData: ChannelData[] = [];
  claimsByType: ClaimBarData[] = [];
  arrearsData: ArrearsItem[] = [];
  financialSummary: FinancialItem[] = [];
  trendData: number[] = [];

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
    this.kpiData = this.dashboardService.getKpiData();
    this.memberStatus = this.dashboardService.getMemberStatus();
    this.genderData = this.dashboardService.getGenderData();
    this.memberTypeData = this.dashboardService.getMemberTypeData();
    this.claimsStatusData = this.dashboardService.getClaimsStatusData();
    this.channelData = this.dashboardService.getChannelData();
    this.claimsByType = this.dashboardService.getClaimsByType();
    this.arrearsData = this.dashboardService.getArrearsData();
    this.financialSummary = this.dashboardService.getFinancialSummary();
    this.trendData = this.dashboardService.getTrendData();
  }

  setActiveNav(link: string) {
    this.activeNav = link;
  }
}
