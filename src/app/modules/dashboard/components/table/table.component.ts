import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, Input, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  @Output('tableEditData') public editData = new EventEmitter<Row>();
  @Output('tableDeleteData') public deleteData = new EventEmitter<Row>();
  @Output('tableCreateData') public createData = new EventEmitter<Boolean>();

  @Input('tableSource') public source: any;
  @Input('tableHeader') public header: string;
  @Input('tableSettings') public settings: any;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onCreate(): void {
    this.createData.emit(true);
    return;
  }

  public onDelete(row: Row): void {
    this.deleteData.emit(row);
    return;
  }

  public onEdit(row: Row): void {
    this.editData.emit(row);
    return;
  }
}
