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

  private createData: Region = null;
  private getAllData: Region[] = null;

  public createDataObservable: EventEmitter<Region> = new EventEmitter<Region>();
  public getAllDataObservable: EventEmitter<Region[]> = new EventEmitter<Region[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('regions')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Region) => {

        this.setCreateData(data);
        let regions: Region[] = this.getGetAllData();
        regions.push(data);
        this.setGetAllData(regions);

        return subject.next(true);
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
        let regions: Region[] = this.getGetAllData().filter(e => e.id != region.id);
        regions.push(region);
        this.setGetAllData(regions);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
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

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
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

        this.setGetAllData(data);
        return subject.next(true);
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

  public setGetAllData(data: Region[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Region[] {
    return Object.assign([], this.getAllData);
  }
}
