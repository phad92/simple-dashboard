import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidebarCollapsed = false;
  currentDate = new Date();

  mainNavItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi-home', route: '/' },
    { label: 'Executive', icon: 'pi-chart-pie', route: '/executive' },
    { label: 'Provider360', icon: 'pi-building', route: '/provider360' }
  ];

  secondaryNavItems: NavItem[] = [
    { label: 'Reports', icon: 'pi-chart-bar', route: '/reports' },
    { label: 'Members', icon: 'pi-users', route: '/members' },
    { label: 'Claims', icon: 'pi-file', route: '/claims' },
    { label: 'Payments', icon: 'pi-wallet', route: '/payments' }
  ];

  bottomNavItems: NavItem[] = [
    { label: 'Settings', icon: 'pi-cog', route: '/settings' },
    { label: 'Help & Support', icon: 'pi-question-circle', route: '/help' }
  ];

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
