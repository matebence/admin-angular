import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Status} from '../../../../shared/models/services/shipment/status.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class StatusService extends BaseService {

  private createData: Status = null;
  private getAllData: Status[] = null;

  public createDataObservable: EventEmitter<Status> = new EventEmitter<Status>();
  public getAllDataObservable: EventEmitter<Status[]> = new EventEmitter<Status[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('status')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Status) => {

        this.setCreateData(data);
        let status: Status[] = this.getGetAllData();
        status.push(data);
        this.setGetAllData(status);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(state: Status): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('status')
      .action('update')
      .params([{id: state._id}])
      .build();

    this.requestHttp
      .put(url, state)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let status: Status[] = this.getGetAllData().filter(e => e._id != state._id);
        status.push(state);
        this.setGetAllData(status);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('status')
      .action('delete')
      .params([{id: id}])
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let status: Status[] = this.getGetAllData().filter(e => e._id != id);
        this.setGetAllData(status);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('status')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Status[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Status): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Status {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Status[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Status[] {
    return Object.assign([], this.getAllData);
  }
}
