import {Component, Input, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';

@Component({
  templateUrl: './table-cell.component.html',
})
export class TableCellComponent implements ViewCell, OnInit {

  public attribute: string = 'country';

  @Input() public value: any;
  @Input() public rowData: any;

  public ngOnInit(): void {
    return;
  }
}
