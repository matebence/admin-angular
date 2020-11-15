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

  public settings: any = {
    ...payoutTableConfig,
    delete: {
      confirmDelete: false,
      deleteButtonContent: ''
    },
    add: {
      confirmCreatwe: false,
      addButtonContent: '',
    }
  };

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
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
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

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().payoutId], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    return;
  }
}
