import {Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Price} from '../../../../shared/models/services/shipment/price.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class PriceService extends BaseService {

  private getData: Price = null;

  public getDataObservable: EventEmitter<Price> = new EventEmitter<Price>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public get(id: string) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('shipment-service')
      .model('prices')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Price) => {
        console.log(data);
        this.setGetData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setGetData(data: Price): void {
    this.getData = data;
    this.getDataObservable.emit(this.getGetData());
    return;
  }

  public getGetData(): Price {
    return Object.assign({}, this.getData);
  }
}
