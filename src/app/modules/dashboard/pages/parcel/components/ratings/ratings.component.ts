declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import ratingTableConfig from '../../../../../../configs/js/parcel/table.rating.config.js';

import {Rating} from '../../../../../../shared/models/services/parcel/rating.model';

import {RatingService} from '../../../../services/parcel-service/rating.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Ohodnotenia';
  private subscriptions: Subscription[] = [];

  public settings: any = ratingTableConfig;

  public constructor(private ratingService: RatingService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.ratingService.errorDataObservable
        .subscribe((error: Error) => {
          $('#ratingModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.ratingService.getAllDataObservable
        .subscribe((ratings: Rating[]) => {
          this.source = new LocalDataSource(ratings);
        })
    );

    this.ratingService.getAll(1, 100);
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
    $('#ratingModal').modal('show');
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
    setTimeout(() => this.ratingService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;
        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
