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

  private createData: Type = null;
  private getAllData: Type[] = null;

  public createDataObservable: EventEmitter<Type> = new EventEmitter<Type>();
  public getAllDataObservable: EventEmitter<Type[]> = new EventEmitter<Type[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('types')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Type) => {

        this.setCreateData(data);
        let types: Type[] = this.getGetAllData();
        types.push(data);
        this.setGetAllData(types);

        return subject.next(true);
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
        let types: Type[] = this.getGetAllData().filter(e => e._id != type._id);
        types.push(type);
        this.setGetAllData(types);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string) {
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
        let types: Type[] = this.getGetAllData().filter(e => e._id != id);
        this.setGetAllData(types);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
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

        this.setGetAllData(data);
        return subject.next(true);
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

  public setGetAllData(data: Type[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Type[] {
    return Object.assign([], this.getAllData);
  }
}
