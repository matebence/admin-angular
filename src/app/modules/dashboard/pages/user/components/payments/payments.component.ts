declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
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

  public settings: any = {
    ...paymentTableConfig,
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
                     private activatedRoute: ActivatedRoute,
                     private paymentService: PaymentService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.paymentService.errorDataObservable
        .subscribe((error: Error) => {
          $('#paymentModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.paymentService.getAllDataObservable
        .subscribe((payments: Payment[]) => {
          this.source = new LocalDataSource(payments);
        })
    );

    this.subscriptions.push(
      this.paymentService.getAll(0, 100)
        .subscribe((payments: Payment[]) => {
          this.paymentService.setGetAllData(payments);
          this.source = new LocalDataSource(payments);
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().paymentId], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    return;
  }
}
