import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        pathMatch: 'full'
    },
    {
        path: 'provider360',
        loadComponent: () => import('./pages/provider360/provider360.component').then(m => m.Provider360Component)
    },
    {
        path: 'executive',
        loadComponent: () => import('./pages/executive-dashboard/executive-dashboard.component').then(m => m.ExecutiveDashboardComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
