import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { take, tap } from 'rxjs';

import { IOpportunity } from '../../model/matching/opportunity.interface';
import { OpportunityService } from '../../services/opportunity.service';
import { DataTableComponent } from '../../ui/data-table/data-table.component';

@Component({
  selector: 'app-uploaded-opportunity',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DataTableComponent,
  ],
  templateUrl: './uploaded-opportunity.component.html',
  styleUrls: ['./uploaded-opportunity.component.scss'],
})
export class UploadedOpportunityComponent implements OnInit {
  public displayedColumns: string[] = [
    'select',
    'object_id',
    'display_name',
    'role',
    'reference_id',
    'rvo_status',
  ];
  public dataSource: MatTableDataSource<IOpportunity> =
    new MatTableDataSource();
  public selectedRow?: IOpportunity;
  public loading = false;

  public selectedOpportunity?: IOpportunity;
  public selectedOpportunities: IOpportunity[] = [];

  constructor(private opportunityService: OpportunityService) {}

  ngOnInit() {
    this.loading = true;
    this.opportunityService
      .getUploadedOpportunities()
      .pipe(
        take(1),
        tap((opportunity: IOpportunity[]) => {
          this.dataSource = new MatTableDataSource<IOpportunity>(opportunity);
          this.loading = false;
        })
      )
      .subscribe();
  }

  setSingleSelected(row: IOpportunity) {
    this.selectedRow = row;
  }

  setMultiSelected(rows: IOpportunity[]) {
    this.selectedOpportunities = rows;
  }

  startMatch() {
    console.log('Start match.');
  }

  addOpportunity() {
    console.log('Add opportunity.');
  }

  deleteOpportunity() {
    console.log('Delete opportunity.');
  }
}
