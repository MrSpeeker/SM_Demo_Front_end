import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 2', cols: 2, rows: 1, data: '' },
          {
            title: 'About Smart Matching',
            cols: 1,
            rows: 1,
            data: 'In the Smart Matching project, we aim to match employees to applications from companies based on their CV.\n\n These employees can be internal, so within CIMSOLUTIONS, but they can also be external candidates.\n\n The resumes of employees within CIMSOLUTIONS all have the same structure. However, external candidates may have resumes with a completely different structure. The idea is to link all resumes to applications using text mining, machine learning and deep learning. Marek Lof is the project leader. Our POs (product owners) are Moynul Hossain, Pim de Jong and Paul Pranger.',
          },
          { title: 'Card 3', cols: 1, rows: 1, data: '' },
          { title: 'Card 4', cols: 2, rows: 1, data: '' },
        ];
      }

      return [
        { title: 'Card 2', cols: 2, rows: 1, data: '' },
        {
          title: 'About Smart Matching',
          cols: 1,
          rows: 1,
          data: 'In the Smart Matching project, we aim to match employees to applications from companies based on their CV.\n\n These employees can be internal, so within CIMSOLUTIONS, but they can also be external candidates.\n\n The resumes of employees within CIMSOLUTIONS all have the same structure. However, external candidates may have resumes with a completely different structure. The idea is to link all resumes to applications using text mining, machine learning and deep learning. Marek Lof is the project leader. Our POs (product owners) are Moynul Hossain, Pim de Jong and Paul Pranger.',
        },
        { title: 'Card 3', cols: 1, rows: 2, data: '' },
        { title: 'Card 4', cols: 1, rows: 1, data: '' },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
