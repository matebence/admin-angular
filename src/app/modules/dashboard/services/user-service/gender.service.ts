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

  private createData: Gender = null;
  private getAllData: Gender[] = null;

  public createDataObservable: EventEmitter<Gender> = new EventEmitter<Gender>();
  public getAllDataObservable: EventEmitter<Gender[]> = new EventEmitter<Gender[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('genders')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Gender) => {

        this.setCreateData(data);
        let genders: Gender[] = this.getGetAllData();
        genders.push(data);
        this.setGetAllData(genders);

        return subject.next(true);
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
        let genders: Gender[] = this.getGetAllData().filter(e => e.genderId != gender.genderId);
        genders.push(gender);
        this.setGetAllData(genders);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
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

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
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

        this.setGetAllData(data);
        return subject.next(true);
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

  public setGetAllData(data: Gender[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Gender[] {
    return Object.assign([], this.getAllData);
  }
}
