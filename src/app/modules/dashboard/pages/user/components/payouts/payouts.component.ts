declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import payoutTableConfig from '../../../../../../configs/js/user/table.payout.config.js';

import {Payout} from '../../../../../../shared/models/services/user/payout.model';

import {PayoutService} from '../../../../services/user-service/payout.service';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.css']
})
export class PayoutsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Výplaty';
  private subscriptions: Subscription[] = [];

  public settings: any = payoutTableConfig;

  public constructor(private router: Router,
                     private payoutService: PayoutService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.payoutService.errorDataObservable
        .subscribe((error: Error) => {
          $('#payoutModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.payoutService.getAllDataObservable
        .subscribe((payouts: Payout[]) => {
          this.source = new LocalDataSource(payouts);
        })
    );

    this.subscriptions.push(
      this.payoutService.getAll(0, 100)
        .subscribe((payouts: Payout[]) => {
          this.payoutService.setGetAllData(payouts);
          this.source = new LocalDataSource(payouts);
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
    $('#payoutModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().payoutId], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.payoutService.delete(this.row.getData().payoutId)
      .subscribe(result => {
        if (!result) return;

        let payouts: Payout[] = this.payoutService.getGetAllData().filter(e => e.payoutId != this.row.getData().payoutId);
        this.payoutService.setGetAllData(payouts);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
