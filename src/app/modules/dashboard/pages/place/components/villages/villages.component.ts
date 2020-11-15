declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import villageTableConfig from '../../../../../../configs/js/place/table.village.config.js';

import {Village} from '../../../../../../shared/models/services/place/village.model';

import {VillageService} from '../../../../services/place-service/village.service';

@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.css']
})
export class VillagesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Mestá a obce';
  private subscriptions: Subscription[] = [];

  public settings: any = villageTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private villageService: VillageService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.villageService.errorDataObservable
        .subscribe((error: Error) => {
          $('#villageModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.villageService.getAllDataObservable
        .subscribe((villages: Village[]) => {
          this.source = new LocalDataSource(villages);
        })
    );

    this.subscriptions.push(
      this.villageService.getAll(1, 100)
        .subscribe((villages: Village[]) => {
          this.villageService.setGetAllData(villages);
          this.source = new LocalDataSource(villages);
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
    $('#villageModal').modal('show');
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
    setTimeout(() => this.villageService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;

        let villages: Village[] = this.villageService.getGetAllData().filter(e => e.id != this.row.getData().id);
        this.villageService.setGetAllData(villages);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
