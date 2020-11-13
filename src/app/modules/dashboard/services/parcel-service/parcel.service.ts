import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Parcel} from '../../../../shared/models/services/parcel/parcel.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class ParcelService extends BaseService {

  private getData: Parcel = null;
  private createData: Parcel = null;
  private getAllData: Parcel[] = null;

  public getDataObservable: EventEmitter<Parcel> = new EventEmitter<Parcel>();
  public createDataObservable: EventEmitter<Parcel> = new EventEmitter<Parcel>();
  public getAllDataObservable: EventEmitter<Parcel[]> = new EventEmitter<Parcel[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Parcel> {
    const subject = new Subject<Parcel>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('parcels')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Parcel) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(parcel: Parcel): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('parcels')
      .action('update')
      .params([{id: parcel.id}])
      .build();

    this.requestHttp
      .put(url, parcel)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('parcels')
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

  public get(id: number): Observable<Parcel> {
    const subject = new Subject<Parcel>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('parcels')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Parcel) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Parcel[]> {
    const subject = new Subject<Parcel[]>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('parcels')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Parcel[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Parcel): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Parcel {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Parcel): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Parcel {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Parcel[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Parcel[] {
    return Object.assign([], this.getAllData);
  }
}
