import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Gender} from '../../../../shared/models/services/user/gender.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class GenderService extends BaseService {

  private getData: Gender = null;
  private createData: Gender = null;
  private getAllData: Gender[] = null;

  public getDataObservable: EventEmitter<Gender> = new EventEmitter<Gender>();
  public createDataObservable: EventEmitter<Gender> = new EventEmitter<Gender>();
  public getAllDataObservable: EventEmitter<Gender[]> = new EventEmitter<Gender[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Gender> {
    const subject = new Subject<Gender>();
    const url = this.routeBuilder
      .service('user-service')
      .model('genders')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Gender) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(gender: Gender): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('genders')
      .action('update')
      .params([{id: gender.genderId}])
      .build();

    this.requestHttp
      .put(url, gender)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('genders')
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

  public get(id: number): Observable<Gender> {
    const subject = new Subject<Gender>();
    const url = this.routeBuilder
      .service('user-service')
      .model('genders')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Gender) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Gender[]> {
    const subject = new Subject<Gender[]>();
    const url = this.routeBuilder
      .service('user-service')
      .model('genders')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Gender[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Gender): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Gender {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Gender): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Gender {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Gender[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Gender[] {
    return Object.assign([], this.getAllData);
  }
}
