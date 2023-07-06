import { Route } from "@angular/router";

export const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'opportunities',
    loadComponent: () =>
      import('./features/opportunities/opportunities.component').then(
        (m) => m.OpportunitiesComponent
      )
  },
  {
    path: 'uploadcvs',
    loadComponent: () =>
      import('./features/uploaded-cv/uploaded-cv.component').then(
        (m) => m.UploadedCvComponent
      )
  },
  {
    path: 'uploadOpportunities',
    loadComponent: () =>
      import(
        './features/uploaded-opportunity/uploaded-opportunity.component'
      ).then((m) => m.UploadedOpportunityComponent)
  },
  {
    path: 'matched',
    loadComponent: () =>
      import('./features/matched/matched.component').then(
        (m) => m.MatchedComponent
      )
  },
  {
    path: 'validation',
    loadComponent: () =>
      import('./features/validation-summary/validation-summary.component').then(
        (m) => m.ValidationSummaryComponent
      )
  },
];
