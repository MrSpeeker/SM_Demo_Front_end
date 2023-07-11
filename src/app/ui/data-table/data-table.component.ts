import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';

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
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public dataSource: MatTableDataSource<any> =
    new MatTableDataSource();
  @Input() public displayedColumns: string[] = [];
  @Input() public langString = '';
  
  @Input() public cellSelectionActive = false;
  @Input() public singleSelectionActive = false;
  
  @Output() public cellSelectEvent = new EventEmitter();
  @Output() public singleSelectEvent = new EventEmitter();
  @Output() public multiSelectEvent = new EventEmitter();
  
  public columnDisplayNames: string[] = [];
  public selectedCell = 'CELL EMPTY'; // Single selected cell.
  public selectedRow!: any; // Single selected row.
  public selection = new SelectionModel<any>(true, []); // Multiple selected rows.

  @ViewChild(MatPaginator) private _paginator!: MatPaginator;
  private _onLangChangeSubscription: Subscription = new Subscription();

  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    if (this.langString) {
      this.loadTranslation();
      this._onLangChangeSubscription = this._translate.onLangChange.subscribe(
        () => {
          this.loadTranslation();
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this._paginator;
  }

  ngOnDestroy() {
    this._onLangChangeSubscription.unsubscribe();
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

  private loadTranslation() {
    this._translate
      .get(this.langString)
      .pipe(take(1))
      .subscribe((data: string[]) => {
        this.columnDisplayNames = Object.values(data);
        if (this.displayedColumns.find(e => e === 'select')) {
          this.columnDisplayNames.unshift('select');
        }
      });
  }
}
