declare const $: any;

import {LocalDataSource} from 'ng2-smart-table';

import {Component, Input, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  @Output('tableResult') public onTableAction = new EventEmitter<LocalDataSource>();

  @Input('tableSource') public source: any;
  @Input('tableHeader') public header: string;
  @Input('tableSettings') public settings: any;

  private event: any;

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onCreateConfirm(event): void {
    $('#tableModal').modal('show');
    this.event = event;
    this.text = 'Vytvorenie položky je potrebné potrvdiť';
    this.title = 'Vytvorenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, vytvoriť';
    return;
  }

  public onDeleteConfirm(event): void {
    $('#tableModal').modal('show');
    this.event = event;
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';
    return;
  }

  public onSaveConfirm(event): void {
    $('#tableModal').modal('show');
    this.event = event;
    this.text = 'Uplatnenie zmien je potrebné potvrdiť';
    this.title = 'Editovanie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Potvrdiť';
    return;
  }

  public onModalResult(event): void {
    if (event) {
      this.onTableAction.emit(this.event);
      this.event.confirm.resolve();
    } else {
      this.event.confirm.reject();
    }
    return;
  }
}
