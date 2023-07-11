import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ISideNavToggle } from '../../model/navigation/sidenav-toggle';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Output() public toggleSideNav: EventEmitter<ISideNavToggle> =
    new EventEmitter();

  public collapsed = false;
  public lang = 'NL';

  constructor(
    public authenticationService: AuthenticationService,
    private translate: TranslateService
  ) {
    translate.addLangs(['EN', 'NL']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('NL');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('NL');
  }

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

  public changeLang(): void {
    this.lang = this.lang === 'NL' ? 'EN' : 'NL';
    this.translate.use(this.lang);
  }
}
