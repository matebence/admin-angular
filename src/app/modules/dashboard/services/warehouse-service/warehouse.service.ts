import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Warehouse} from '../../../../shared/models/services/warehouse/warehouse.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class WarehouseService extends BaseService {

  private getData: Warehouse = null;
  private createData: Warehouse = null;
  private getAllData: Warehouse[] = null;

  public getDataObservable: EventEmitter<Warehouse> = new EventEmitter<Warehouse>();
  public createDataObservable: EventEmitter<Warehouse> = new EventEmitter<Warehouse>();
  public getAllDataObservable: EventEmitter<Warehouse[]> = new EventEmitter<Warehouse[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Warehouse> {
    const subject = new Subject<Warehouse>();
    const url = this.routeBuilder
      .service('warehouse-service')
      .model('warehouses')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Warehouse) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(warehouse: Warehouse): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('warehouse-service')
      .model('warehouses')
      .action('update')
      .params([{id: warehouse._id}])
      .build();

    this.requestHttp
      .put(url, warehouse)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('warehouse-service')
      .model('warehouses')
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

  public get(id: string): Observable<Warehouse> {
    const subject = new Subject<Warehouse>();
    const url = this.routeBuilder
      .service('warehouse-service')
      .model('warehouses')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Warehouse) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Warehouse[]> {
    const subject = new Subject<Warehouse[]>();
    const url = this.routeBuilder
      .service('warehouse-service')
      .model('warehouses')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Warehouse[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Warehouse): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Warehouse {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Warehouse): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Warehouse {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Warehouse[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Warehouse[] {
    return Object.assign([], this.getAllData);
  }
}
