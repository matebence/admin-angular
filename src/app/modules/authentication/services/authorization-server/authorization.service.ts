import {Params} from '@angular/router';
import {Observable, Subject} from 'rxjs/index';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';

import {environment} from '../../../../../environments/environment';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

import {ForgetPassword, Recover, SignIn, SignOut} from '../../../../shared/models/services/authorization/authorization.model';

@Injectable()
export class AuthorizationService extends BaseService {

  private signInData: SignIn = null;
  private recoverData: Recover = null;
  private signOutData: SignOut = null;
  private forgetPasswordData: ForgetPassword = null;

  public signInDataObservable: EventEmitter<SignIn> = new EventEmitter<SignIn>();
  public recoverDataObservable: EventEmitter<Recover> = new EventEmitter<Recover>();
  public signOutDataObservable: EventEmitter<SignOut> = new EventEmitter<SignOut>();
  public forgetPasswordDataObservable: EventEmitter<ForgetPassword> = new EventEmitter<ForgetPassword>();

  public constructor(private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder) {
    super();
  }

  public OAuth2Password(userName: string, password: string, remain: boolean): Observable<SignIn> {
    const httpParams = new HttpParams({
      fromObject: {
        username: userName,
        password: password,
        grant_type: environment.GRANT_TYPE_PASSWORD
      }
    });
    return this.signIn(httpParams, remain);
  }

  public OAuth2RefreshToken(remain: boolean, refreshToken: string): Observable<SignIn> {
    const httpParams = new HttpParams({
      fromObject: {
        refresh_token: refreshToken,
        grant_type: environment.GRANT_TYPE_REFRESH_TOKEN
      }
    });
    return this.signIn(httpParams, remain);
  }

  private signIn(httpParams: HttpParams, remain: boolean): Observable<SignIn> {
    const subject = new Subject<SignIn>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('signIn')
      .action('create')
      .build();

    this.requestHttp
      .post(url, httpParams)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: SignIn) => {

        return subject.next({...data, remain: remain, expirationDate: new Date(new Date().getTime() + data.expires_in * 1000)});
      });
    return subject.asObservable();
  }

  public signOut(): Observable<SignOut> {
    const subject = new Subject<SignOut>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('signOut')
      .action('create')
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: SignOut) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public forgetPassword(email: string): Observable<ForgetPassword> {
    const subject = new Subject<ForgetPassword>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('forgetPassword')
      .action('create')
      .build();

    this.requestHttp
      .post(url, {email: email})
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: ForgetPassword) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public recover(params: Params): Observable<Recover> {
    const subject = new Subject<Recover>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('recover')
      .action('get')
      .params(Object.entries(params).map(([k, v]) => ({[k]: v})))
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Recover) => {

        return subject.next(data);
      });
    return subject.asObservable();
  }

  public setRecoverData(data: Recover): void {
    this.recoverData = data;
    this.recoverDataObservable.emit(this.getRecoverData());
    return;
  }

  public getRecoverData(): Recover {
    return Object.assign({}, this.recoverData);
  }

  public setForgetPasswordData(data: ForgetPassword): void {
    this.forgetPasswordData = data;
    this.forgetPasswordDataObservable.emit(this.getForgetPasswordData());
    return;
  }

  public getForgetPasswordData(): ForgetPassword {
    return Object.assign({}, this.forgetPasswordData);
  }

  public setSignOutData(data: SignOut): void {
    this.signOutData = data;
    this.signOutDataObservable.emit(this.getSignOutData());
    return;
  }

  public getSignOutData(): SignOut {
    return Object.assign({}, this.signOutData);
  }

  public setSignInData(data: SignIn): void {
    this.signInData = data;
    this.signInDataObservable.emit(this.getSignInData());
    return;
  }

  public getSignInData(): SignIn {
    return Object.assign({}, this.signInData);
  }
}
