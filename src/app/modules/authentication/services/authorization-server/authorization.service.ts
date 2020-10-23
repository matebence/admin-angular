import {Params} from '@angular/router';
import {Observable, Subject} from 'rxjs/index';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {EventEmitter, Injectable} from '@angular/core';

import {BaseService} from '../../../../core/services/base.service';
import {PersistenceService} from '../../../../core/services/persistence-service/persistence.service';

import {environment} from '../../../../../environments/environment';

import {ForgetPassword, Recover, SignIn, SignOut} from '../../../../shared/models/services/account/account.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';

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
                     private routeBuilder: RouteBuilder,
                     private persistenceService: PersistenceService) {
    super();
  }

  public OAuth2Password(userName: string, password: string, remain: boolean): Observable<Boolean> {
    const httpParams = new HttpParams({
      fromObject: {
        username: userName,
        password: password,
        grant_type: environment.GRANT_TYPE_PASSWORD
      }
    });
    return this.signIn(httpParams, remain);
  }

  public OAuth2RefreshToken(remain: boolean, refreshToken: string): Observable<Boolean> {
    const httpParams = new HttpParams({
      fromObject: {
        refresh_token: refreshToken,
        grant_type: environment.GRANT_TYPE_REFRESH_TOKEN
      }
    });
    return this.signIn(httpParams, remain);
  }

  private signIn(httpParams: HttpParams, remain: boolean): Observable<Boolean> {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('signIn')
      .action('create')
      .build();

    this.requestHttp
      .post(url, httpParams)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: SignIn) => {
        this.setSignInData(data);

        this.persistenceService.set(environment.LOCAL_STORAGE_ACCOUNT_DATA, this.getSignInData());
        this.persistenceService.append(environment.LOCAL_STORAGE_ACCOUNT_DATA, {remain: remain, expirationDate: new Date(new Date().getTime() + data.expires_in * 1000)});

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public signOut(): Observable<Boolean> {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('signOut')
      .action('create')
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: SignOut) => {
        this.setSignOutData(data);
        this.persistenceService.clear();

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public forgetPassword(email: string): Observable<Boolean> {
    const subject = new Subject<Boolean>();
    const url = this.routeBuilder
      .service('authorization-server')
      .model('forgetPassword')
      .action('create')
      .build();

    this.requestHttp
      .post(url, {email: email})
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: ForgetPassword) => {

        this.setForgetPasswordData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public recover(params: Params): Observable<Boolean> {
    const subject = new Subject<Boolean>();
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

        this.setRecoverData(data);
        return subject.next(true);
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

  public setSignOutData(data: SignOut): void {
    this.signOutData = data;
    this.signOutDataObservable.emit(this.getSignOutData())
  }

  public getSignOutData(): SignOut {
    return Object.assign({}, this.signOutData);
  }

  public setSignInData(data: SignIn): void {
    this.signInData = data;
    this.signInDataObservable.emit(this.getSignInData())
  }

  public getSignInData(): SignIn {
    return Object.assign({}, this.signInData);
  }
}
