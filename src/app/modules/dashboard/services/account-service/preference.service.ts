import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Preference} from '../../../../shared/models/services/account/preference.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class PreferenceService extends BaseService {

  private createData: Preference = null;
  private getAllData: Preference[] = null;

  public createDataObservable: EventEmitter<Preference> = new EventEmitter<Preference>();
  public getAllDataObservable: EventEmitter<Preference[]> = new EventEmitter<Preference[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('categories')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Preference) => {

        this.setCreateData(data);
        let preferences: Preference[] = this.getGetAllData();
        preferences.unshift(data);
        this.setGetAllData(preferences);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(preference: Preference): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('categories')
      .action('update')
      .params([{id: preference.preferenceId}])
      .build();

    this.requestHttp
      .put(url, preference)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let preferences: Preference[] = this.getGetAllData().filter(e => e.preferenceId != preference.preferenceId);
        preferences.unshift(preference);
        this.setGetAllData(preferences);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('categories')
      .action('delete')
      .params([{id: id}])
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let preferences: Preference[] = this.getGetAllData().filter(e => e.preferenceId != id);
        this.setGetAllData(preferences);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('account-service')
      .model('preferences')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Preference[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Preference): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Preference {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Preference[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Preference[] {
    return Object.assign([], this.getAllData);
  }
}
