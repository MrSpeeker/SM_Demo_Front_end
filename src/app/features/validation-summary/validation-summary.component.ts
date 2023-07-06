import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ValidationSummaryService } from '../../services/validation-summary.service';
import { take, tap } from 'rxjs';
import { IValidationSummary } from '../../model/matching/validation-summary.interface';
import { DataTableComponent } from 'src/app/ui/data-table/data-table.component';
import { ChartMatrixComponent } from 'src/app/ui/chart-matrix/chart-matrix.component';

@Component({
  selector: 'app-validation-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    DataTableComponent,
    ChartMatrixComponent,
  ],
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.scss'],
})
export class ValidationSummaryComponent implements OnInit {
  public displayedColumns: string[] = [
    'Accuracy',
    'CohenKappa',
    'F1',
    'Model_name',
    'Precision',
    'RMSE',
    'Ranking',
    'Recall',
  ];
  public dataSource: MatTableDataSource<IValidationSummary> =
    new MatTableDataSource();
  public loading = false;
  public selectedRow?: IValidationSummary;

  constructor(private validationSummaryService: ValidationSummaryService) {}

  ngOnInit() {
    this.loading = true;
    this.validationSummaryService
      .getValidationSet()
      .pipe(
        take(1),
        tap((validation_data: IValidationSummary[]) => {
          const data: IValidationSummary[] = [];
          for (const key in validation_data) {
            if (Object.prototype.hasOwnProperty.call(validation_data, key)) {
              data.push(validation_data[key]);
            }
          }
          this.dataSource = new MatTableDataSource<IValidationSummary>(data);
          this.loading = false;
        })
      )
      .subscribe();
  }

  displayGraph(row: IValidationSummary) {
    this.selectedRow = row;
  }
}
