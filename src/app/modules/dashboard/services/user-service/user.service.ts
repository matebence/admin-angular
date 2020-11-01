import {Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {User} from '../../../../shared/models/services/user/user.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class UserService extends BaseService {

  private getData: User = null;
  private getAllData: User[] = null;

  public getDataObservable: EventEmitter<User> = new EventEmitter<User>();
  public getAllDataObservable: EventEmitter<User[]> = new EventEmitter<User[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public delete(id: number) {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('users')
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

  public get(id: number) {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('users')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: User) => {

        this.setGetData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('users')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: User[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setGetData(data: User): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): User {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: User[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): User[] {
    return Object.assign([], this.getAllData);
  }
}
