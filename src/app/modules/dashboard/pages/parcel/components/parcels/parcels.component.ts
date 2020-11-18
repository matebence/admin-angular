declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
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

  public constructor(private router: Router,
                     private parcelService: ParcelService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.parcelService.errorDataObservable
        .subscribe((error: Error) => {
          $('#parcelModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.parcelService.getAllDataObservable
        .subscribe((parcels: Parcel[]) => {
          this.source = new LocalDataSource(parcels);
        })
    );

    this.subscriptions.push(
      this.parcelService.getAll(1, 100)
        .subscribe((parcels: Parcel[]) => {
          this.parcelService.setGetAllData(parcels);
          this.source = new LocalDataSource(parcels);
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: boolean): void {
    if (row) this.router.navigate(['new'], {relativeTo: this.activatedRoute});
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
    this.router.navigate(['edit', row.getData().id], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.parcelService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;

        let parcels: Parcel[] = this.parcelService.getGetAllData().filter(e => e.id != this.row.getData().id);
        this.parcelService.setGetAllData(parcels);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
