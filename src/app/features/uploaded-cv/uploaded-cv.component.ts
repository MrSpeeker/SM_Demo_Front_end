import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { take, tap } from 'rxjs';

import { ICv } from '../../model/matching/cv.interface';
import { CvService } from '../../services/cv.service';
import { DataTableComponent } from '../../ui/data-table/data-table.component';
import { ThresholdSeverity } from '@angular-devkit/build-angular/src/utils/bundle-calculator';

@Component({
  selector: 'app-uploaded-cv',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DataTableComponent,
  ],
  templateUrl: './uploaded-cv.component.html',
  styleUrls: ['./uploaded-cv.component.scss'],
})
export class UploadedCvComponent implements OnInit {
  public displayedColumns: string[] = ['select', 'name'];
  public dataSource: MatTableDataSource<ICv> = new MatTableDataSource();
  public loading = false;
  public selectedCv?: ICv;
  public selectedCvs: ICv[] = [];

  constructor(private cvService: CvService) {}

  ngOnInit() {
    this.loading = true;
    this.cvService.getUploadedCvs().pipe(
      take(1),
      tap((cv: ICv[]) => {
        this.dataSource = new MatTableDataSource<ICv>(cv);
        this.loading = false;
      })
    ).subscribe();
  }

  setSingleSelected(row: ICv) {
    this.selectedCv = row;
  }

  setMultiSelected(rows: ICv[]) {
    this.selectedCvs = rows;
  }
 
  addCv() {
    console.log('Add cv.');
  }

  deleteCv() {
    console.log('Delete cv.');
  }
}
