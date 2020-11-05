declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import genderTableConfig from '../../../../../../configs/js/user/table.gender.config.js';

import {Gender} from '../../../../../../shared/models/services/user/gender.model';

import {GenderService} from '../../../../services/user-service/gender.service';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.css']
})
export class GendersComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Pohlavia';
  private subscriptions: Subscription[] = [];

  public settings: any = genderTableConfig;

  public constructor(private genderService: GenderService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.genderService.errorDataObservable
        .subscribe((error: Error) => {
          $('#genderModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.genderService.getAllDataObservable
        .subscribe((genders: Gender[]) => {
          this.source = new LocalDataSource(genders);
        })
    );

    this.genderService.getAll(0, 100);
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
    $('#genderModal').modal('show');
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
    setTimeout(() => this.genderService.delete(this.row.getData().genderId)
      .subscribe(result => {
        if (!result) return;
        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
