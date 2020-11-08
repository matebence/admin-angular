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

  private createData: Parcel = null;
  private getAllData: Parcel[] = null;

  public createDataObservable: EventEmitter<Parcel> = new EventEmitter<Parcel>();
  public getAllDataObservable: EventEmitter<Parcel[]> = new EventEmitter<Parcel[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('parcels')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Parcel) => {

        this.setCreateData(data);
        let parcels: Parcel[] = this.getGetAllData();
        parcels.push(data);
        this.setGetAllData(parcels);

        return subject.next(true);
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
        let parcels: Parcel[] = this.getGetAllData().filter(e => e.id != parcel.id);
        parcels.push(parcel);
        this.setGetAllData(parcels);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
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
        let parcels: Parcel[] = this.getGetAllData().filter(e => e.id != id);
        this.setGetAllData(parcels);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
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

        this.setGetAllData(data);
        return subject.next(true);
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

  public setGetAllData(data: Parcel[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Parcel[] {
    return Object.assign([], this.getAllData);
  }
}
