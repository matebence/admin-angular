import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Payout} from '../../../../shared/models/services/user/payout.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class PayoutService extends BaseService {

  private createData: Payout = null;
  private getAllData: Payout[] = null;

  public createDataObservable: EventEmitter<Payout> = new EventEmitter<Payout>();
  public getAllDataObservable: EventEmitter<Payout[]> = new EventEmitter<Payout[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('payouts')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Payout) => {

        this.setCreateData(data);
        let payouts: Payout[] = this.getGetAllData();
        payouts.push(data);
        this.setGetAllData(payouts);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(payout: Payout): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('payouts')
      .action('update')
      .params([{id: payout.payoutId}])
      .build();

    this.requestHttp
      .put(url, payout)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let payouts: Payout[] = this.getGetAllData().filter(e => e.payoutId != payout.payoutId);
        payouts.push(payout);
        this.setGetAllData(payouts);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('payouts')
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
      .model('payouts')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Payout[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Payout): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Payout {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Payout[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Payout[] {
    return Object.assign([], this.getAllData);
  }
}
