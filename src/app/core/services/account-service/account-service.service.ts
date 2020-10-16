import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

import {BaseService} from '../base-service.service';
import {RequestHTTP} from '../../http/request.http';
import {RouteBuilder} from '../../http/route-builder.http';
import {environment} from '../../../../environments/environment';
import {SignIn} from '../../../shared/models/services/account/account.model';

@Injectable()
export class AccountService extends BaseService {

  public constructor(private requestHttp: RequestHTTP, private routeBuilder: RouteBuilder) {
    super();
  }

  public signIn(payload: FormGroup) {
    const url = this.routeBuilder.service('authorization-server').model('signIn').action('create').build();
    const pyaload = new HttpParams({
      fromObject: {
        username: payload.value.user.name,
        password: payload.value.user.password,
        grant_type: environment.GRANT_TYPE_PASSWORD
      }
    });

    this.requestHttp
      .post(url, pyaload)
      .pipe(catchError(super.handleError))
      .subscribe((data: SignIn) => {
        console.log(data)
      });
  }
}
