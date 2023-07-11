import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { take, tap } from 'rxjs';

import { IOpportunity } from '../../model/matching/opportunity.interface';
import { OpportunityService } from '../../services/opportunity.service';
import { DataTableComponent } from '../../ui/data-table/data-table.component';
import { ViewComponent } from '../../ui/view/view.component';

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    TranslateModule,
    MatSnackBarModule,
    ViewComponent,
    DataTableComponent,
  ],
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss'],
})
export class OpportunitiesComponent implements OnInit {
  public langString = 'OPPORTUNITIES.TABLE';
  public dataSource: MatTableDataSource<IOpportunity> =
    new MatTableDataSource();
  public loading = false;
  public displayedColumns: string[] = [
    'object_id',
    'display_name',
    'role',
    'reference_id',
    'rvo_status',
  ];
  public selectedRow!: IOpportunity;
  public viewOpportunity = false;

  private _opportunities!: IOpportunity[];

  constructor(
    private _opportunityService: OpportunityService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loading = true;
    this._opportunityService
      .getOpportunities()
      .pipe(
        take(1),
        tap((opportunity: IOpportunity[]) => {
          this._opportunities = opportunity;
          this.dataSource = new MatTableDataSource<IOpportunity>(opportunity);
          this.loading = false;
        })
      )
      .subscribe();
  }

  public startMatch() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {
    //   uploadedOpportunity: false,
    //   id: this.selectedRow?.object_id,
    //   opportunities: this._opportunities,
    // };
    // return this.dialog.open(RunMatchDialogComponent, dialogConfig);
  }

  public setSingleSelected(row: IOpportunity) {
    this.selectedRow = row;
  }

  public openOpportunity() {
    if (this.selectedRow) {
      this.viewOpportunity = true;
    } else {
      this._snackBar.open('Please select a record!', 'Dismiss', {
        duration: 3000,
      });
    }
  }

  public backClicked() {
    this.viewOpportunity = false;
  }
}
