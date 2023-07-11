import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription, take, tap } from 'rxjs';

import { ICv } from '../../model/matching/cv.interface';
import { CvService } from '../../services/cv.service';
import { DataTableComponent } from '../../ui/data-table/data-table.component';
import { ViewComponent } from '../../ui/view/view.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/ui/delete-dialog/delete-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { IOperationType } from 'src/app/model/operation-type';
import { AddDialogComponent } from 'src/app/ui/add-dialog/add-dialog.component';
import { FileData } from 'src/app/model/file-data';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-uploaded-cv',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DataTableComponent,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    ViewComponent,
  ],
  templateUrl: './uploaded-cv.component.html',
  styleUrls: ['./uploaded-cv.component.scss'],
})
export class UploadedCvComponent implements OnInit, OnDestroy {
  public viewCv = false;
  public loading = false;
  public selectedRow?: ICv;
  public selectedRows: ICv[] = [];
  public langString = 'UPLOADEDCVS.TABLE';
  public displayedColumns: string[] = ['select', 'name'];
  public dataSource: MatTableDataSource<ICv> = new MatTableDataSource();

  private translations: { [key: string]: string } = {};
  private onLangChangeSubscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private _cvService: CvService,
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

  setSingleSelected(row: ICv) {
    this.selectedRow = row;
  }

  setMultiSelected(rows: ICv[]) {
    this.selectedRows = rows;
  }

  openCv() {
    this.viewCv = true;
  }

  backClicked() {
    this.viewCv = false;
  }

  addCv() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      label: 'Opportunity',
      operation_type: IOperationType.UploadedCV,
    };
    const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (results: FileData[]) => {
      if (results.length) {
        const cvs: ICv[] = [];
        for (const result of results) {
          cvs.push({
            name: result.file_name,
            text: { full_text: result.file_text },
          });
        }
        this.loading = true;
        this._cvService
          .uploadCvs(cvs)
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

  deleteCv() {
    if (this.selectedRows.length) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        selectedRows: this.selectedRows,
      };
      const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result == 'delete') {
          this.loading = true;
          this._cvService
            .deleteUploadedCV(dialogConfig.data.name)
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
    this._cvService
      .getUploadedCvs()
      .pipe(
        take(1),
        tap((cv: ICv[]) => {
          this.dataSource = new MatTableDataSource<ICv>(cv);
          this.loading = false;
        })
      )
      .subscribe();
  }
}
