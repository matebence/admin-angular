import {Subject} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {User} from '../../../../shared/models/services/user/user.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

@Injectable()
export class UserService extends BaseService {

  private userData: User = null;

  public userDataObservable: EventEmitter<User> = new EventEmitter<User>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public get(id: number) {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('user-service')
      .model('users')
      .action('get')
      .params([{id: id}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: User) => {

        this.setUserData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setUserData(data: User): void {
    this.userData = data;
    this.userDataObservable.emit(this.getUserData());
    return;
  }

  public getUserData(): User {
    return Object.assign({}, this.userData);
  }
}
