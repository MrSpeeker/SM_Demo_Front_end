import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription, take, tap } from 'rxjs';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FileData } from 'src/app/model/file-data';
import { IOperationType } from 'src/app/model/operation-type';
import { AddDialogComponent } from 'src/app/ui/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from 'src/app/ui/delete-dialog/delete-dialog.component';
import { ViewComponent } from 'src/app/ui/view/view.component';
import { IOpportunity } from '../../model/matching/opportunity.interface';
import { OpportunityService } from '../../services/opportunity.service';
import { DataTableComponent } from '../../ui/data-table/data-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

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
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    ViewComponent,
  ],
  templateUrl: './uploaded-opportunity.component.html',
  styleUrls: ['./uploaded-opportunity.component.scss'],
})
export class UploadedOpportunityComponent implements OnInit, OnDestroy {
  public langString = 'OPPORTUNITIES.TABLE';
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
  public viewOpportunity = false;

  public selectedOpportunity?: IOpportunity;
  public selectedOpportunities: IOpportunity[] = [];

  private translations: { [key: string]: string } = {};
  private onLangChangeSubscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private _opportunityService: OpportunityService,
    private _snackBar: MatSnackBar,
    private _translate: TranslateService
  ) {}

  ngOnInit() {
    this.loading = true;
    this._loadData();
    this._loadTranslation();
    this.onLangChangeSubscription = this._translate.onLangChange.subscribe(
      () => {
        this._loadTranslation();
      }
    );
  }

  ngOnDestroy(): void {
    this.onLangChangeSubscription.unsubscribe();
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

  openOpportunity() {
    this.viewOpportunity = true;
  }

  backClicked() {
    this.viewOpportunity = false;
  }

  addOpportunity() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      label: 'Opportunity',
      operation_type: IOperationType.UploadedOpportunity,
    };
    const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (results: FileData[]) => {
      if (results.length) {
        const opportunities: IOpportunity[] = [];
        for (const result of results) {
          opportunities.push({
            display_name: result.file_name,
            opportunity_id: '',
            text: { full_text: result.file_text },
            reference_id: 0,
            rvo_status: '',
            object_id: 0,
            role: '',
          });
        }
        this.loading = true;
        this._opportunityService
          .uploadOpportunities(opportunities)
          .pipe(take(1))
          .subscribe(() => {
            this._snackBar.open(
              this.translations['OPPORTUNITY_ADDED'],
              this.translations['CLOSE']
            );
            this._loadData();
          });
      }
    });
  }

  deleteOpportunity() {
    if (this.selectedOpportunities.length) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        selectedRows: this.selectedOpportunities,
      };
      const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result == 'delete') {
          this.loading = true;
          this._opportunityService
            .deleteUploadedOpportunity(dialogConfig.data.name)
            .pipe(take(1))
            .subscribe(() => {
              this._snackBar.open(
                this.translations['DELETE_RECORD'],
                this.translations['CLOSE']
              );
              this._loadData();
            });
        }
      });
    }
  }

  private _loadTranslation() {
    this._translate
      .get('TOAST')
      .pipe(take(1))
      .subscribe((data: { [key: string]: string }) => {
        this.translations = data;
      });
  }

  private _loadData() {
    this._opportunityService
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
}
