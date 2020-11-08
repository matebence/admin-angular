import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {EventEmitter, Injectable} from '@angular/core';
import {catchError, switchMap} from 'rxjs/internal/operators';

import {BaseService} from '../../../../core/services/base.service';

import {Village} from '../../../../shared/models/services/place/village.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

import {RegionService} from './region.service';
import {DistrictService} from './district.service';

@Injectable()
export class VillageService extends BaseService {

  private createData: Village = null;
  private getAllData: Village[] = null;

  public createDataObservable: EventEmitter<Village> = new EventEmitter<Village>();
  public getAllDataObservable: EventEmitter<Village[]> = new EventEmitter<Village[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,
                     private regionService: RegionService,
                     private districtService: DistrictService) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('villages')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .pipe(switchMap((data: Village) => {
        this.setCreateData(data);
        this.districtService.get(data.districtId);
        return this.regionService.get(data.regionId);
      }))
      .subscribe((result: boolean) => {
        if (!result) return;
        let villages: Village[] = this.getGetAllData();
        villages.unshift({...this.getCreateData(), region: this.regionService.getGetData(), district: this.districtService.getGetData()});
        this.setGetAllData(villages);

        return subject.next(true);
      });

    return subject.asObservable();
  }

  public update(village: Village): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('villages')
      .action('update')
      .params([{id: village.id}])
      .build();

    this.requestHttp
      .put(url, village)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let villages: Village[] = this.getGetAllData().filter(e => e.id != village.id);
        villages.push(village);
        this.setGetAllData(villages);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('villages')
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
      .model('villages')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Village[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Village): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Village {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Village[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Village[] {
    return Object.assign([], this.getAllData);
  }
}
