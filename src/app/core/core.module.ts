import {NgModule} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {ErrorPage} from './error/error.page';

import {BaseService} from './services/base.service';
import {PersistenceService} from './services/persistence-service/persistence.service';
import {AuthorizationService} from './services/authorization-server/authorization.service';

import {TypeInterceptor} from './interceptors/type.interceptor';
import {AuthorizationInterceptor} from './interceptors/authorization.interceptor';
import {CredentialsExpirationInterceptor} from './interceptors/credentials-expiration.interceptor';

import {RequestHTTP} from './http/request.http';
import {RouteBuilder} from './http/route-builder.http';

import {SharedModule} from '../shared/shared.module';
import {CoreRoutingModule} from './core-routing.module';

@NgModule({
  declarations: [
    ErrorPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    CoreRoutingModule
  ],
  providers: [
    RequestHTTP,
    BaseService,
    RouteBuilder,
    PersistenceService,
    {provide: HTTP_INTERCEPTORS, useClass: TypeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true, deps: [PersistenceService]},
    {provide: HTTP_INTERCEPTORS, useClass: CredentialsExpirationInterceptor, multi: true, deps: [Router, PersistenceService, AuthorizationService]}
  ],
  exports: [ErrorPage, CoreRoutingModule]
})
export class CoreModule {
}
