import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements AfterViewInit {
  @Input() public dataSource: MatTableDataSource<any> =
    new MatTableDataSource();
  @Input() public displayedColumns: string[] = [];

  // Cell select variable
  @Input() public cellSelectionActive = false;
  @Output() public cellSelectEvent = new EventEmitter();
  public selectedCell = 'CELL EMPTY';

  // Single select variables
  @Input() public singleSelectionActive = false;
  @Output() public singleSelectEvent = new EventEmitter();
  public selectedRow!: any;

  // Multi selection variables
  @Output() public multiSelectEvent = new EventEmitter();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public cellSelected(event: any) {
    if (this.cellSelectionActive && event) {
      this.selectedCell = event;
      this.cellSelectEvent.emit(this.selectedCell);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.multiSelectEvent.emit(this.selection.selected);
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.multiSelectEvent.emit(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  public selectRow(row: any) {
    if (this.singleSelectionActive) {
      this.selectedRow = row;
      this.singleSelectEvent.emit(row);
    }
  }

  public multiSelect(row: any) {
    this.selection.toggle(row);
    this.multiSelectEvent.emit(this.selection.selected);
  }
}
