declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
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
    },
    add: {
      confirmCreatwe: false,
      addButtonContent: '',
    }
  };

  public constructor(private router: Router,
                     private priceService: PriceService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.priceService.errorDataObservable
        .subscribe((error: Error) => {
          $('#profitModal').modal('show');
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

    this.subscriptions.push(
    this.priceService.get(environment.COMPANY_PROFIT_ID)
      .subscribe((price: Price) => {
        this.source = new LocalDataSource([price]);
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData()._id], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    return;
  }
}
