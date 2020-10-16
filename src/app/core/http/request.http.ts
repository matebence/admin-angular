import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

import {environment} from './environment';

import 'rxjs/Rx';

@Injectable()
export class RequestHTTP<T> {

  private readonly GET: string = 'GET';
  private readonly PUT: string = 'PUT';
  private readonly POST: string = 'POST';
  private readonly DELETE: string = 'DELETE';

  public constructor(private httpClient: HttpClient) {
  }

  public get(headers: HttpHeaders, params: HttpParams) {
    return this.httpClient.request(new HttpRequest(this.GET, environment.HOST_BLESK, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      params: params
    }));
  }

  public put(headers: HttpHeaders, params: HttpParams, payload: T) {
    return this.httpClient.request(new HttpRequest(this.PUT, environment.HOST_BLESK, payload, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      params: params
    }));
  }

  public post(headers: HttpHeaders, payload: T) {
    return this.httpClient.request(new HttpRequest(this.POST, environment.HOST_BLESK, payload, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
    }));
  }

  public delete(headers: HttpHeaders, params: HttpParams) {
    return this.httpClient.request(new HttpRequest(this.DELETE, environment.HOST_BLESK, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      params: params
    }));
  }
}
