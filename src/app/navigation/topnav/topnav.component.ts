import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ISideNavToggle } from '../../model/navigation/sidenav-toggle';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Output() public toggleSideNav: EventEmitter<ISideNavToggle> =
    new EventEmitter();

  public collapsed = false;

  constructor(public authenticationService: AuthenticationService) {}

  async ngOnInit() {
    await this.authenticationService.setActiveAcount();
    this.authenticationService.verifyLogin();
  }

  public toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.toggleSideNav.emit({
      collapsed: this.collapsed,
    });
  }
}
