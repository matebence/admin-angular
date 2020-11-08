declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import shipmentTableConfig from '../../../../../../configs/js/shipment/table.shipment.config.js';

import {Shipment} from '../../../../../../shared/models/services/shipment/shipment.model';

import {ShipmentService} from '../../../../services/shipment-service/shipment.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Zásielky';
  private subscriptions: Subscription[] = [];

  public settings: any = shipmentTableConfig;

  public constructor(private shipmentService: ShipmentService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.shipmentService.errorDataObservable
        .subscribe((error: Error) => {
          $('#shipmentModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.shipmentService.getAllDataObservable
        .subscribe((shipments: Shipment[]) => {
          this.source = new LocalDataSource(shipments);
        })
    );

    this.shipmentService.getAll(1, 100);
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
    $('#shipmentModal').modal('show');
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
    setTimeout(() => this.shipmentService.delete(this.row.getData()._id)
      .subscribe(result => {
        if (!result) return;

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
