declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import paymentTableConfig from '../../../../../../configs/js/user/table.payment.config.js';

import {Payment} from '../../../../../../shared/models/services/user/payment.model';

import {PaymentService} from '../../../../services/user-service/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Platby';
  private subscriptions: Subscription[] = [];

  public settings: any = paymentTableConfig;

  public constructor(private paymentService: PaymentService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.paymentService.errorDataObservable
        .subscribe((error: Error) => {
          $('#paymentModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.paymentService.getAllDataObservable
        .subscribe((payments: Payment[]) => {
          this.source = new LocalDataSource(payments);
        })
    );

    this.paymentService.getAll(0, 100);
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
    $('#paymentModal').modal('show');
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
    setTimeout(() => this.paymentService.delete(this.row.getData().paymentId)
      .subscribe(result => {
        if (!result) return;

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
