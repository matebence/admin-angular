import {NgModule} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {ErrorPage} from './error/error.page';

import {BaseService} from './services/base.service';
import {PersistenceService} from './services/persistence-service/persistence.service';
import {SecurityService} from '../modules/dashboard/services/security-service/security.service';
import {AuthorizationService} from '../modules/authentication/services/authorization-server/authorization.service';

import {TypeInterceptor} from './interceptors/type.interceptor';
import {HateoasInterceptor} from './interceptors/hateoas.interceptor';
import {AuthorizationInterceptor} from './interceptors/authorization.interceptor';
import {CredentialsExpirationInterceptor} from './interceptors/credentials-expiration.interceptor';

import {RoleGuard} from './guards/role.guard';
import {AuthGuard} from './guards/auth.guard';
import {LeaveGuard} from './guards/leave.guard';

import {RequestHTTP} from './http/request.http';
import {RouteFilter} from './filter/route.filter';
import {RouteBuilder} from './http/route-builder.http';

import {SharedModule} from '../shared/shared.module';
import {CoreRoutingModule} from './core-routing.module';

@NgModule({
  declarations: [
    ErrorPage,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    LoadingBarModule,
    CoreRoutingModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    LeaveGuard,

    BaseService,
    SecurityService,
    PersistenceService,

    RouteFilter,
    RequestHTTP,
    RouteBuilder,

    {provide: HTTP_INTERCEPTORS, useClass: TypeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HateoasInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true, deps: [PersistenceService]},
    {provide: HTTP_INTERCEPTORS, useClass: CredentialsExpirationInterceptor, multi: true, deps: [Router, PersistenceService, AuthorizationService]}
  ],
  exports: [ErrorPage, CoreRoutingModule, LoadingBarRouterModule, LoadingBarHttpClientModule, LoadingBarModule]
})
export class CoreModule {
}
