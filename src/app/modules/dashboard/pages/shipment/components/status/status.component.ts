declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import statusTableConfig from '../../../../../../configs/js/shipment/table.status.config.js';

import {Status} from '../../../../../../shared/models/services/shipment/status.model';

import {StatusService} from '../../../../services/shipment-service/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Statusy';
  private subscriptions: Subscription[] = [];

  public settings: any = statusTableConfig;

  public constructor(private statusService: StatusService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.statusService.errorDataObservable
        .subscribe((error: Error) => {
          $('#statusModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.statusService.getAllDataObservable
        .subscribe((statuss: Status[]) => {
          this.source = new LocalDataSource(statuss);
        })
    );

    this.statusService.getAll(1, 100);
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: boolean): void {
    return;
  }

  public onTableDeleteData(row: Row): void {
    $('#statusModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.statusService.delete(this.row.getData()._id)
      .subscribe(result => {
        if (!result) return;

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
