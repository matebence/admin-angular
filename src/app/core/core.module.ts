import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {ErrorPage} from './error/error.page';

import {BaseService} from './services/base.service';
import {PersistenceService} from './services/persistence-service/persistence.service';

import {TypeInterceptor} from './interceptors/type.interceptor';
import {BasicInterceptor} from './interceptors/basic.interceptor';
import {BearerInterceptor} from './interceptors/bearer.interceptor';

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
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true, deps: [PersistenceService]}
  ],
  exports: [ErrorPage, CoreRoutingModule]
})
export class CoreModule {
}
