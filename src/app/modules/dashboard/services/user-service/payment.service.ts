import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Payment} from '../../../../shared/models/services/user/payment.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class PaymentService extends BaseService {

  private createData: Payment = null;
  private getAllData: Payment[] = null;

  public createDataObservable: EventEmitter<Payment> = new EventEmitter<Payment>();
  public getAllDataObservable: EventEmitter<Payment[]> = new EventEmitter<Payment[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('payments')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Payment) => {

        this.setCreateData(data);
        let payments: Payment[] = this.getGetAllData();
        payments.push(data);
        this.setGetAllData(payments);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(payment: Payment): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('payments')
      .action('update')
      .params([{id: payment.paymentId}])
      .build();

    this.requestHttp
      .put(url, payment)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let payments: Payment[] = this.getGetAllData().filter(e => e.paymentId != payment.paymentId);
        payments.push(payment);
        this.setGetAllData(payments);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('payments')
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

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('payments')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Payment[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Payment): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Payment {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Payment[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Payment[] {
    return Object.assign([], this.getAllData);
  }
}
