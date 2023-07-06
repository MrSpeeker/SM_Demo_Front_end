import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { take, tap } from 'rxjs';

import { IOpportunity } from '../../model/matching/opportunity.interface';
import { OpportunityService } from '../../services/opportunity.service';
import { DataTableComponent } from '../../ui/data-table/data-table.component';
import { ViewComponent } from "../../ui/view/view.component";

@Component({
    selector: 'app-opportunities',
    standalone: true,
    templateUrl: './opportunities.component.html',
    styleUrls: ['./opportunities.component.scss'],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatButtonModule,
        DataTableComponent,
        ViewComponent
    ]
})
export class OpportunitiesComponent implements OnInit {
  public dataSource: MatTableDataSource<IOpportunity> =
    new MatTableDataSource();
  public loading = false;
  public displayedColumns: string[] = [
    'object_id',
    'display_name',
    'role',
    'reference_id',
    'rvo_status',
    'view',
  ];
  public selectedRow!: IOpportunity;
  public viewOpportunity = false;

  constructor(private opportunityService: OpportunityService) {}

  ngOnInit() {
    this.loading = true;
    this.opportunityService
      .getOpportunities()
      .pipe(
        take(1),
        tap((opportunity: IOpportunity[]) => {
          this.dataSource = new MatTableDataSource<IOpportunity>(opportunity);
          this.loading = false;
        })
      )
      .subscribe();
  }

  startMatch() {
    console.log('Start Match');
  }

  setSingleSelected(row: IOpportunity) {
    this.selectedRow = row;
    this.viewOpportunity = true;
  }

  backClicked() {
    this.viewOpportunity = false;
  }
}
