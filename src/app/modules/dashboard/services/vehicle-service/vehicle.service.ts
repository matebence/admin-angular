import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {EventEmitter, Injectable} from '@angular/core';
import {catchError, switchMap} from 'rxjs/internal/operators';

import {BaseService} from '../../../../core/services/base.service';

import {Vehicle} from '../../../../shared/models/services/vehicle/vehicle.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class VehicleService extends BaseService {

  private getData: Vehicle = null;
  private createData: Vehicle = null;
  private getAllData: Vehicle[] = null;

  public getDataObservable: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();
  public createDataObservable: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();
  public getAllDataObservable: EventEmitter<Vehicle[]> = new EventEmitter<Vehicle[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Vehicle> {
    const subject = new Subject<Vehicle>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Vehicle) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(vehicle: Vehicle): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('update')
      .params([{id: vehicle._id}])
      .build();

    this.requestHttp
      .put(url, vehicle)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
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

  public get(id: string): Observable<Vehicle> {
    const subject = new Subject<Vehicle>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Vehicle) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Vehicle[]> {
    const subject = new Subject<Vehicle[]>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Vehicle[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Vehicle): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Vehicle {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Vehicle): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Vehicle {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Vehicle[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Vehicle[] {
    return Object.assign([], this.getAllData);
  }
}
