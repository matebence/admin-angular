import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {DefaultEditor} from 'ng2-smart-table';

@Component({
  templateUrl: './cell-editor.component.html',
})
export class CellEditorComponent extends DefaultEditor implements AfterViewInit {

  @ViewChild('name') name: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    if (this.cell.newValue !== '') {
      this.name.nativeElement.value = this.cell.value.country;
    }
  }

  updateValue() {
    this.cell.value.country = this.name.nativeElement.value;
    console.log(this.cell.value);
    this.cell.newValue = this.cell.value;
  }
}
