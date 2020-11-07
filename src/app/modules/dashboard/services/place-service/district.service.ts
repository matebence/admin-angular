import {Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {District} from '../../../../shared/models/services/place/district.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class DistrictService extends BaseService {

  private getAllData: District[] = null;

  public getAllDataObservable: EventEmitter<District[]> = new EventEmitter<District[]>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
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

  public setGetAllData(data: District[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): District[] {
    return Object.assign([], this.getAllData);
  }
}
