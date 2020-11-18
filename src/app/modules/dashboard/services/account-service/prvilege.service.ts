import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Privilege} from '../../../../shared/models/services/account/privilege.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class PrivilegeService extends BaseService {

  private getData: Privilege = null;
  private createData: Privilege = null;
  private getAllData: Privilege[] = null;

  public getDataObservable: EventEmitter<Privilege> = new EventEmitter<Privilege>();
  public createDataObservable: EventEmitter<Privilege> = new EventEmitter<Privilege>();
  public getAllDataObservable: EventEmitter<Privilege[]> = new EventEmitter<Privilege[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Privilege> {
    const subject = new Subject<Privilege>();
    const url = this.routeBuilder
      .service('account-service')
      .model('privileges')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Privilege) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(privilege: Privilege): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('privileges')
      .action('update')
      .params([{id: privilege.privilegeId}])
      .build();

    this.requestHttp
      .put(url, privilege)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('privileges')
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

  public get(id: number): Observable<Privilege> {
    const subject = new Subject<Privilege>();
    const url = this.routeBuilder
      .service('account-service')
      .model('privileges')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Privilege) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Privilege[]> {
    const subject = new Subject<Privilege[]>();
    const url = this.routeBuilder
      .service('account-service')
      .model('privileges')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Privilege[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Privilege): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Privilege {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Privilege): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Privilege {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Privilege[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Privilege[] {
    return Object.assign([], this.getAllData);
  }
}
