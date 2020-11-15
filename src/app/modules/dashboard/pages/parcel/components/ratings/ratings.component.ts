declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
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
  public header: string = 'Recenzie';
  private subscriptions: Subscription[] = [];

  public settings: any = ratingTableConfig;

  public constructor(private router: Router,
                     private ratingService: RatingService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.ratingService.errorDataObservable
        .subscribe((error: Error) => {
          $('#ratingModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.ratingService.getAllDataObservable
        .subscribe((ratings: Rating[]) => {
          this.source = new LocalDataSource(ratings);
        })
    );

    this.subscriptions.push(
      this.ratingService.getAll(1, 100)
        .subscribe((ratings: Rating[]) => {
          this.ratingService.setGetAllData(ratings);
          this.source = new LocalDataSource(ratings);
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
    $('#ratingModal').modal('show');
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
    setTimeout(() => this.ratingService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;

        let ratings: Rating[] = this.ratingService.getGetAllData().filter(e => e.id != this.row.getData().id);
        this.ratingService.setGetAllData(ratings);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
