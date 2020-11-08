import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Account} from '../../../../shared/models/services/account/account.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class AccountService extends BaseService {

  private createData: Account = null;
  private getAllData: Account[] = null;

  public createDataObservable: EventEmitter<Account> = new EventEmitter<Account>();
  public getAllDataObservable: EventEmitter<Account[]> = new EventEmitter<Account[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('accounts')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Account) => {

        this.setCreateData(data);
        let accounts: Account[] = this.getGetAllData();
        accounts.unshift(data);
        this.setGetAllData(accounts);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(account: Account): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('accounts')
      .action('update')
      .params([{id: account.accountId}])
      .build();

    this.requestHttp
      .put(url, account)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let accounts: Account[] = this.getGetAllData().filter(e => e.accountId != account.accountId);
        accounts.unshift(account);
        this.setGetAllData(accounts);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('accounts')
      .action('delete')
      .params([{id: id}])
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let accounts: Account[] = this.getGetAllData().filter(e => e.accountId != id);
        this.setGetAllData(accounts);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('accounts')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Account[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Account): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Account {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Account[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Account[] {
    return Object.assign([], this.getAllData);
  }
}
