declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {environment} from '../../../../../../../environments/environment';

import profitTableConfig from '../../../../../../configs/js/company/table.profit.config.js';

import {Price} from '../../../../../../shared/models/services/shipment/price.model';

import {PriceService} from '../../../../services/shipment-service/price.service';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css']
})
export class ProfitComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Profit';
  private subscriptions: Subscription[] = [];

  public settings: any = {
    ...profitTableConfig,
    delete: {
      confirmDelete: false,
      deleteButtonContent: ''
    }
  };

  public constructor(private priceService: PriceService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.priceService.errorDataObservable
        .subscribe((error: Error) => {
          $('#priceModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.priceService.getDataObservable
        .subscribe((price: Price) => {
          this.source = new LocalDataSource([price]);
        })
    );

    this.priceService.get(environment.COMPANY_PROFIT_ID);
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: Boolean): void {
    return;
  }

  public onTableEditData(row: Row): void {
    this.row = row;
    return;
  }

  public onModalResult(event: Boolean): void {
    return;
  }
}
