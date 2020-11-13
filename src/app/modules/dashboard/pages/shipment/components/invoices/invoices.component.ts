declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import invoiceTableConfig from '../../../../../../configs/js/shipment/table.invoice.config.js';

import {Invoice} from '../../../../../../shared/models/services/shipment/invoice.model';

import {InvoiceService} from '../../../../services/shipment-service/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Faktúry';
  private subscriptions: Subscription[] = [];

  public settings: any = invoiceTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private invoiceService: InvoiceService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.invoiceService.errorDataObservable
        .subscribe((error: Error) => {
          $('#invoiceModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.invoiceService.getAllDataObservable
        .subscribe((invoices: Invoice[]) => {
          this.source = new LocalDataSource(invoices);
        })
    );

    this.subscriptions.push(
      this.invoiceService.getAll(1, 100)
        .subscribe((invoices: Invoice[]) => {
          this.invoiceService.setGetAllData(invoices);
          this.source = new LocalDataSource(invoices);
        })
    );

    this.subscriptions.push(
      this.invoiceService.getDataObservable
        .subscribe((pdf: Blob) => {
          const blob: Blob = new Blob([pdf], {type: 'application/pdf'});
          const objectUrl: string = window.URL.createObjectURL(blob);
          const link: HTMLAnchorElement = document.createElement('a');

          link.href = objectUrl;
          link.download = Date.now().toString();
          link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
          setTimeout(() => {window.URL.revokeObjectURL(objectUrl); link.remove();}, 100);})
    );

    if (this.activatedRoute.firstChild == null) return;

    this.subscriptions.push(
      this.activatedRoute.firstChild.params.subscribe((params: Params) => {
        this.invoiceService.get(params.id);
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
    $('#invoiceModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData()._id], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.invoiceService.delete(this.row.getData()._id)
      .subscribe(result => {
        if (!result) return;

        let invoices: Invoice[] = this.invoiceService.getGetAllData().filter(e => e._id != this.row.getData()._id);
        this.invoiceService.setGetAllData(invoices);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
