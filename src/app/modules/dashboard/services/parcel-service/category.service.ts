import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Category} from '../../../../shared/models/services/parcel/category.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class CategoryService extends BaseService {

  private getData: Category = null;
  private createData: Category = null;
  private getAllData: Category[] = null;

  public getDataObservable: EventEmitter<Category> = new EventEmitter<Category>();
  public createDataObservable: EventEmitter<Category> = new EventEmitter<Category>();
  public getAllDataObservable: EventEmitter<Category[]> = new EventEmitter<Category[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Category> {
    const subject = new Subject<Category>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('categories')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Category) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public update(category: Category): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('categories')
      .action('update')
      .params([{id: category.id}])
      .build();

    this.requestHttp
      .put(url, category)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number): Observable<boolean> {
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

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public get(id: number): Observable<Category> {
    const subject = new Subject<Category>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('categories')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Category) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number): Observable<Category[]> {
    const subject = new Subject<Category[]>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('categories')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Category[]) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Category): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Category {
    return Object.assign({}, this.createData);
  }

  public setGetData(data: Category): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Category {
    return Object.assign({}, this.getData);
  }

  public setGetAllData(data: Category[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Category[] {
    return Object.assign([], this.getAllData);
  }
}
