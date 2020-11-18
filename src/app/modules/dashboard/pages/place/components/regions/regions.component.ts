declare const $: any;

import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import regionTableConfig from '../../../../../../configs/js/place/table.region.config.js';

import {Region} from '../../../../../../shared/models/services/place/region.model';

import {RegionService} from '../../../../services/place-service/region.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Kraje';
  private subscriptions: Subscription[] = [];

  public settings: any = regionTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private regionService: RegionService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.regionService.errorDataObservable
        .subscribe((error: Error) => {
          $('#regionModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.regionService.getAllDataObservable
        .subscribe((regions: Region[]) => {
          this.source = new LocalDataSource(regions);
        })
    );

    this.subscriptions.push(
      this.regionService.getAll(1, 100)
        .subscribe((regions: Region[]) => {
          this.regionService.setGetAllData(regions);
          this.source = new LocalDataSource(regions);
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
    $('#regionModal').modal('show');
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
    setTimeout(() => this.regionService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;

        let regions: Region[] = this.regionService.getGetAllData().filter(e => e.id != this.row.getData().id);
        this.regionService.setGetAllData(regions);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
