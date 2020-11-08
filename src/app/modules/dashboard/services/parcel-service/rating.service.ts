import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Rating} from '../../../../shared/models/services/parcel/rating.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class RatingService extends BaseService {

  private createData: Rating = null;
  private getAllData: Rating[] = null;

  public createDataObservable: EventEmitter<Rating> = new EventEmitter<Rating>();
  public getAllDataObservable: EventEmitter<Rating[]> = new EventEmitter<Rating[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('ratings')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Rating) => {

        this.setCreateData(data);
        let ratings: Rating[] = this.getGetAllData();
        ratings.push(data);
        this.setGetAllData(ratings);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(rating: Rating): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('ratings')
      .action('update')
      .params([{id: rating.id}])
      .build();

    this.requestHttp
      .put(url, rating)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let ratings: Rating[] = this.getGetAllData().filter(e => e.id != rating.id);
        ratings.push(rating);
        this.setGetAllData(ratings);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('ratings')
      .action('delete')
      .params([{id: id}])
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let ratings: Rating[] = this.getGetAllData().filter(e => e.id != id);
        this.setGetAllData(ratings);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('parcel-service')
      .model('ratings')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Rating[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Rating): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Rating {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Rating[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Rating[] {
    return Object.assign([], this.getAllData);
  }
}
