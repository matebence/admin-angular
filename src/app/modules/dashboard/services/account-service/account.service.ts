import {Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Account} from '../../../../shared/models/services/account/account.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class AccountService extends BaseService {

  private getAllData: Account[] = null;

  public getAllDataObservable: EventEmitter<Account[]> = new EventEmitter<Account[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
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

  public setGetAllData(data: Account[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Account[] {
    return Object.assign([], this.getAllData);
  }
}
