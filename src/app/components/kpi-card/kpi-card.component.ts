import { Component, Input, OnInit, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  template: `
    <div class="bg-white/90 backdrop-blur-xl border border-black/5 rounded-2xl p-6 flex items-start gap-4 
                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up">
      <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
           [class]="getIconBgClass()">
        <i [class]="getIconClass()" class="text-white text-xl"></i>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-slate-600">{{ label }}</span>
        <span class="text-2xl font-bold text-slate-900">{{ displayValue }}</span>
        <span class="text-xs font-medium" [class]="changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'">{{ change }}</span>
      </div>
    </div>
  `
})
export class KpiCardComponent implements AfterViewInit {
  @Input() icon = '';
  @Input() iconClass = '';
  @Input() label = '';
  @Input() value = 0;
  @Input() prefix = '';
  @Input() change = '';
  @Input() changeType: 'positive' | 'negative' = 'positive';

  displayValue = '';
  private animated = false;

  constructor(
    private elementRef: ElementRef,
    private dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.displayValue = this.prefix + '0';
      this.setupIntersectionObserver();
    } else {
      this.displayValue = this.prefix + this.dashboardService.formatNumber(this.value) ;
    }
  }

  getIconClass(): string {
    const iconMap: { [key: string]: string } = {
      'members': 'pi pi-users',
      'premium': 'pi pi-dollar',
      'claims': 'pi pi-file',
      'payments': 'pi pi-credit-card'
    };
    return iconMap[this.icon] || 'pi pi-chart-bar';
  }

  getIconBgClass(): string {
    const bgMap: { [key: string]: string } = {
      'members': 'bg-gradient-to-br from-cyan-500 to-sky-400 shadow-lg shadow-cyan-500/25',
      'premium': 'bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/25',
      'claims': 'bg-gradient-to-br from-pink-500 to-rose-400 shadow-lg shadow-pink-500/25',
      'payments': 'bg-gradient-to-br from-amber-500 to-yellow-400 shadow-lg shadow-amber-500/25'
    };
    return bgMap[this.iconClass] || 'bg-gradient-to-br from-indigo-500 to-purple-500';
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          this.animateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.elementRef.nativeElement);
  }

  private animateCounter() {
    const duration = 2000;
    const increment = this.value / (duration / 16);
    let current = 0;

    const update = () => {
      current += increment;
      if (current < this.value) {
        this.displayValue = this.prefix + this.dashboardService.formatNumber(Math.floor(current));
        requestAnimationFrame(update);
      } else {
        this.displayValue = this.prefix + this.dashboardService.formatNumber(this.value);
      }
    };

    update();
  }
}
