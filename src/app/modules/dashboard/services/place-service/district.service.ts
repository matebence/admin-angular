import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {RegionService} from './region.service';
import {BaseService} from '../../../../core/services/base.service';

import {District} from '../../../../shared/models/services/place/district.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class DistrictService extends BaseService {

  private createData: District = null;
  private getAllData: District[] = null;

  public createDataObservable: EventEmitter<District> = new EventEmitter<District>();
  public getAllDataObservable: EventEmitter<District[]> = new EventEmitter<District[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,
                     private regionService: RegionService) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('districts')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .pipe(switchMap((data: District) => {
        this.setCreateData(data);
        return this.regionService.get(data.regionId)
      }))
      .subscribe((result: boolean) => {
        if (!result) return;
        let districts: District[] = this.getGetAllData();
        districts.unshift({...this.getCreateData(), region: this.regionService.getGetData()});
        this.setGetAllData(districts);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(district: District): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('districts')
      .action('update')
      .params([{id: district.id}])
      .build();

    this.requestHttp
      .put(url, district)
      .pipe(catchError(super.handleError.bind(this)))
      .pipe(switchMap(() => {
        return this.regionService.get(district.regionId)
      }))
      .subscribe((result: boolean) => {
        if (!result) return;
        let districts: District[] = this.getGetAllData().filter(e => e.id != district.id);
        districts.unshift({...district, region: this.regionService.getGetData()});
        this.setGetAllData(districts);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('place-service')
      .model('districts')
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
      .model('districts')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: District[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: District): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): District {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: District[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): District[] {
    return Object.assign([], this.getAllData);
  }
}
