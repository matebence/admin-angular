import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Shipment} from '../../../../shared/models/services/shipment/shipment.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class ShipmentService extends BaseService {

  private createData: Shipment = null;
  private getAllData: Shipment[] = null;

  public createDataObservable: EventEmitter<Shipment> = new EventEmitter<Shipment>();
  public getAllDataObservable: EventEmitter<Shipment[]> = new EventEmitter<Shipment[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('shipments')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Shipment) => {

        this.setCreateData(data);
        let shipments: Shipment[] = this.getGetAllData();
        shipments.push(data);
        this.setGetAllData(shipments);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(shipment: Shipment): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('shipments')
      .action('update')
      .params([{id: shipment._id}])
      .build();

    this.requestHttp
      .put(url, shipment)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let shipments: Shipment[] = this.getGetAllData().filter(e => e._id != shipment._id);
        shipments.push(shipment);
        this.setGetAllData(shipments);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('shipments')
      .action('delete')
      .params([{id: id}])
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let shipments: Shipment[] = this.getGetAllData().filter(e => e._id != id);
        this.setGetAllData(shipments);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('shipments')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Shipment[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Shipment): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Shipment {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Shipment[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Shipment[] {
    return Object.assign([], this.getAllData);
  }
}
