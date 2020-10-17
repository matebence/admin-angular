import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {RequestHTTP} from './http/request.http';
import {RouteBuilder} from './http/route-builder.http';

import {BaseService} from "./services/base.service";

import {BasicInterceptor} from './interceptors/basic.interceptor';
import {RequestInterceptor} from './interceptors/request.interceptor';

import {ErrorPage} from './error/error.page';

import {SharedModule} from '../shared/shared.module';
import {CoreRoutingModule} from './core-routing.module';
import {TypeInterceptor} from "./interceptors/type.interceptor";
import {ResponseInterceptor} from './interceptors/response.interceptor';

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
    {provide: HTTP_INTERCEPTORS, useClass: TypeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
  ],
  exports: [ErrorPage, CoreRoutingModule]
})
export class CoreModule {
}
