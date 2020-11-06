declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import parcelTableConfig from '../../../../../../configs/js/parcel/table.parcel.config.js';

import {Parcel} from '../../../../../../shared/models/services/parcel/parcel.model';

import {ParcelService} from '../../../../services/parcel-service/parcel.service';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css']
})
export class ParcelsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Balíky';
  private subscriptions: Subscription[] = [];

  public settings: any = parcelTableConfig;

  public constructor(private parcelService: ParcelService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.parcelService.errorDataObservable
        .subscribe((error: Error) => {
          $('#parcelModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.parcelService.getAllDataObservable
        .subscribe((parcels: Parcel[]) => {
          this.source = new LocalDataSource(parcels);
        })
    );

    this.parcelService.getAll(1, 100);
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: Boolean): void {
    return;
  }

  public onTableDeleteData(row: Row): void {
    $('#parcelModal').modal('show');
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

  public onModalResult(event: Boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.parcelService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;
        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
