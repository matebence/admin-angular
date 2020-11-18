import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Role} from '../../../../shared/models/services/account/role.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class RoleService extends BaseService {

  private getData: Role = null;
  private createData: Role = null;
  private getAllData: Role[] = null;

  public getDataObservable: EventEmitter<Role> = new EventEmitter<Role>();
  public createDataObservable: EventEmitter<Role> = new EventEmitter<Role>();
  public getAllDataObservable: EventEmitter<Role[]> = new EventEmitter<Role[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Role> {
    const subject = new Subject<Role>();
    const url = this.routeBuilder
      .service('account-service')
      .model('roles')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Role) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(role: Role): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('roles')
      .action('update')
      .params([{id: role.roleId}])
      .build();

    this.requestHttp
      .put(url, role)
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
      .model('roles')
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

  public get(id: number): Observable<Role> {
    const subject = new Subject<Role>();
    const url = this.routeBuilder
      .service('account-service')
      .model('roles')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Role) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Role[]> {
    const subject = new Subject<Role[]>();
    const url = this.routeBuilder
      .service('account-service')
      .model('roles')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Role[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Role): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Role {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Role): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Role {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Role[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Role[] {
    return Object.assign([], this.getAllData);
  }
}
