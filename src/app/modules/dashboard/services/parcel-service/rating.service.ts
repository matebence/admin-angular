import {Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Rating} from '../../../../shared/models/services/parcel/rating.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class RatingService extends BaseService {

  private getAllData: Rating[] = null;

  public getAllDataObservable: EventEmitter<Rating[]> = new EventEmitter<Rating[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
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

  public setGetAllData(data: Rating[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Rating[] {
    return Object.assign([], this.getAllData);
  }
}
