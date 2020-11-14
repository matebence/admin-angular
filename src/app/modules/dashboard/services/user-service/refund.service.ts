import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {Refund} from '../../../../shared/models/services/user/refund.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class RefundService extends BaseService {

  private createData: Refund = null;

  public createDataObservable: EventEmitter<Refund> = new EventEmitter<Refund>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<Refund> {
    const subject = new Subject<Refund>();
    const url = this.routeBuilder
      .service('user-service')
      .model('refunds')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Refund) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Refund): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Refund {
    return Object.assign({}, this.createData);
  }
}
