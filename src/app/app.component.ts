import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TopnavComponent } from './navigation/topnav/topnav.component';
import { ISideNavToggle } from './model/navigation/sidenav-toggle';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { NavbarComponent } from './test/navbar/navbar.component';
import { DashboardComponent } from './test/dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        CommonModule,
        TopnavComponent,
        SidenavComponent,
        NavbarComponent,
        DashboardComponent
    ]
})
export class AppComponent {
  isSideNavCollapsed = false;

  onToggleSideNav(data: ISideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
  }
}
