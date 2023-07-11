import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { TopnavComponent } from './navigation/topnav/topnav.component';
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
        DashboardComponent
    ]
})
export class AppComponent {

}
