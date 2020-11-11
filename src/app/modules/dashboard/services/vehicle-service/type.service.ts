import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Type} from '../../../../shared/models/services/vehicle/type.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class TypeService extends BaseService {

  private getData: Type = null;
  private createData: Type = null;
  private getAllData: Type[] = null;

  public getDataObservable: EventEmitter<Type> = new EventEmitter<Type>();
  public createDataObservable: EventEmitter<Type> = new EventEmitter<Type>();
  public getAllDataObservable: EventEmitter<Type[]> = new EventEmitter<Type[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Type> {
    const subject = new Subject<Type>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('types')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Type) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(type: Type): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('types')
      .action('update')
      .params([{id: type._id}])
      .build();

    this.requestHttp
      .put(url, type)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('types')
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

  public get(id: string): Observable<Type> {
    const subject = new Subject<Type>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('types')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Type) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Type[]> {
    const subject = new Subject<Type[]>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('types')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Type[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Type): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Type {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Type): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Type {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Type[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Type[] {
    return Object.assign([], this.getAllData);
  }
}
