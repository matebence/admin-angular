import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Region} from '../../../../shared/models/services/place/region.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class RegionService extends BaseService {

  private getData: Region = null;
  private createData: Region = null;
  private getAllData: Region[] = null;

  public getDataObservable: EventEmitter<Region> = new EventEmitter<Region>();
  public createDataObservable: EventEmitter<Region> = new EventEmitter<Region>();
  public getAllDataObservable: EventEmitter<Region[]> = new EventEmitter<Region[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Region> {
    const subject = new Subject<Region>();
    const url = this.routeBuilder
      .service('place-service')
      .model('regions')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Region) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(region: Region): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('regions')
      .action('update')
      .params([{id: region.id}])
      .build();

    this.requestHttp
      .put(url, region)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('regions')
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

  public get(id: number): Observable<Region> {
    const subject = new Subject<Region>();
    const url = this.routeBuilder
      .service('place-service')
      .model('regions')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Region) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Region[]> {
    const subject = new Subject<Region[]>();
    const url = this.routeBuilder
      .service('place-service')
      .model('regions')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Region[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Region): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Region {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Region): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Region {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Region[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Region[] {
    return Object.assign([], this.getAllData);
  }
}
