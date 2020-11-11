import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Invoice} from '../../../../shared/models/services/shipment/invoice.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class InvoiceService extends BaseService {

  private getData: Blob = null;
  private createData: Invoice = null;
  private getAllData: Invoice[] = null;

  public getDataObservable: EventEmitter<Blob> = new EventEmitter<Blob>();
  public createDataObservable: EventEmitter<Invoice> = new EventEmitter<Invoice>();
  public getAllDataObservable: EventEmitter<Invoice[]> = new EventEmitter<Invoice[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Invoice> {
    const subject = new Subject<Invoice>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('invoices')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Invoice) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(invoice: Invoice): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('invoices')
      .action('update')
      .params([{id: invoice._id}])
      .build();

    this.requestHttp
      .put(url, invoice)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('invoices')
      .action('delete')
      .params([{id: id}])
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public get(id: string): Observable<Blob> {
    const subject = new Subject<Blob>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('invoices')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url, 'blob')
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Blob) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Invoice[]> {
    const subject = new Subject<Invoice[]>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('invoices')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Invoice[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Invoice): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Invoice {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Blob): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Blob {
    return this.getData;
  }

  public setGetAllData(data: Invoice[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Invoice[] {
    return Object.assign([], this.getAllData);
  }
}
