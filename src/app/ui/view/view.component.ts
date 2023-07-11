import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataTableComponent } from '../data-table/data-table.component';
import { HighlightPipe } from './high-light.pipe';

@Component({
  selector: 'app-view',
  standalone: true,
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    DataTableComponent,
    HighlightPipe,
  ],
})
export class ViewComponent implements OnInit {
  @Input() selectedRow!: any;
  @Input() public dataSource: MatTableDataSource<any> =
    new MatTableDataSource();
  @Output() backEvent = new EventEmitter();
  public displayedColumns: string[] = [
    'opportunity_demands',
    'opportunity_wishes',
    'opportunity_terms',
  ];
  public cleanRegex = /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~]/g;
  public newLineRegex = /(?:\r\n|\r|\n)/g;
  public selectedTerm = '';

  ngOnInit() {
    const tableData = this.convert_opportunity_data(this.selectedRow);
    this.dataSource = new MatTableDataSource<any>(tableData);
  }

  public backButton() {
    this.backEvent.emit();
  }

  public cellSelected(event: string) {
    if (Array.isArray(event)) {
      this.selectedTerm = event[0].split('(')[0].trim();
    } else {
      this.selectedTerm = event.split('(')[0].trim();
    }
  }

  private convert_opportunity_data(opportunity: any) {
    const table_data = [];
    let maxLength = 0;
    for (const key in opportunity) {
      if (
        Object.prototype.hasOwnProperty.call(opportunity, key) &&
        Array.isArray(opportunity[key])
      ) {
        const currentLength = opportunity[key].length;
        if (currentLength > maxLength) {
          maxLength = currentLength;
        }
      }
    }
    for (let i = 0; i < maxLength; i++) {
      const row = {
        opportunity_demands: opportunity.opportunity_demands[i]
          ? opportunity.opportunity_demands[i][0]
          : opportunity.opportunity_demands[i],
        opportunity_wishes: opportunity.opportunity_wishes[i],
        opportunity_terms: opportunity.opportunity_terms[i],
      };

      table_data.push(row);
    }
    return table_data;
  }
}
