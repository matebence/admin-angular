import {Params} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {RequestHTTP} from '../../http/request.http';
import {RouteBuilder} from '../../http/route-builder.http';
import {environment} from '../../../../environments/environment';
import {ForgetPassword, Recover, SignIn} from '../../../shared/models/services/account/account.model';

@Injectable()
export class AuthorizationService extends BaseService {

  private signInData: SignIn = null;
  private recoverData: Recover = null;
  private forgetPasswordData: ForgetPassword = null;

  public signInDataObservable: EventEmitter<SignIn> = new EventEmitter<SignIn>();
  public recoverDataObservable: EventEmitter<Recover> = new EventEmitter<Recover>();
  public forgetPasswordDataObservable: EventEmitter<ForgetPassword> = new EventEmitter<ForgetPassword>();

  public constructor(private requestHttp: RequestHTTP, private routeBuilder: RouteBuilder) {
    super();
  }

  public signIn(formGroup: FormGroup): Observable<Boolean> {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('signIn')
      .action('create')
      .build();

    const payload: HttpParams = new HttpParams({
      fromObject: {
        username: formGroup.value.user.name,
        password: formGroup.value.user.password,
        grant_type: environment.GRANT_TYPE_PASSWORD
      }
    });

    this.requestHttp
      .post(url, payload)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: SignIn) => {
        this.setSignInData(data);
        subject.next(true);
      });
    return subject.asObservable();
  }

  public forgetPassword(formGroup: FormGroup): Observable<Boolean> {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('forgetPassword')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value.user)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: ForgetPassword) => {
        this.setForgetPasswordData(data);
        subject.next(true);
      });
    return subject.asObservable();
  }

  public recover(params: Params): Observable<Boolean> {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('recover')
      .action('get')
      .params(Object.entries(params).map(( [k, v] ) => ({ [k]: v })))
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Recover) => {
        this.setRecoverData(data);
        subject.next(true);
      });
    return subject.asObservable();
  }

  public setRecoverData(data: Recover): void {
    this.recoverData = data;
    this.recoverDataObservable.emit(this.getRecoverData())
  }

  public getRecoverData(): Recover {
    return Object.assign({}, this.recoverData);
  }

  public setForgetPasswordData(data: ForgetPassword): void {
    this.forgetPasswordData = data;
    this.forgetPasswordDataObservable.emit(this.getForgetPasswordData())
  }

  public getForgetPasswordData(): ForgetPassword {
    return Object.assign({}, this.forgetPasswordData);
  }

  public setSignInData(data: SignIn): void {
    this.signInData = data;
    this.signInDataObservable.emit(this.getSignInData())
  }

  public getSignInData(): SignIn {
    return Object.assign({}, this.signInData);
  }
}
