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

  private createData: Warehouse = null;
  private getAllData: Warehouse[] = null;

  public createDataObservable: EventEmitter<Warehouse> = new EventEmitter<Warehouse>();
  public getAllDataObservable: EventEmitter<Warehouse[]> = new EventEmitter<Warehouse[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('warehouse-service')
      .model('warehouses')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Warehouse) => {

        this.setCreateData(data);
        let warehouses: Warehouse[] = this.getGetAllData();
        warehouses.push(data);
        this.setGetAllData(warehouses);

        return subject.next(true);
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
        let warehouses: Warehouse[] = this.getGetAllData().filter(e => e._id != warehouse._id);
        warehouses.push(warehouse);
        this.setGetAllData(warehouses);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string) {
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

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
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

        this.setGetAllData(data);
        return subject.next(true);
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

  public setGetAllData(data: Warehouse[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Warehouse[] {
    return Object.assign([], this.getAllData);
  }
}
