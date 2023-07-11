import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterModule } from '@angular/router';
import { ISideNavToggle } from '../../model/navigation/sidenav-toggle';
import { BodyComponent } from '../body/body.component';
import { navbarData } from './sidenav';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [
    NgFor,
    NgIf,
    MatIconModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    BodyComponent,
    RouterModule,
    TopnavComponent
  ],
})
export class SidenavComponent {
  @Input() public isSideNavCollapsed = false;
  public navData = navbarData;

  public onToggleSideNav(data: ISideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
  }
}
