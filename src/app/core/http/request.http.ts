import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class RequestHTTP {

  public constructor(private httpClient: HttpClient) {
  }

  public get(url: string, responseType?: any, params?: HttpParams, headers?: HttpHeaders): Observable<Object> {
    return this.httpClient.get(url, {
      params: params,
      observe: 'body',
      headers: headers,
      responseType: responseType || 'json',
      reportProgress: true
    });
  }

  public put(url: string, payload: any, responseType?: any, params?: HttpParams, headers?: HttpHeaders): Observable<Object> {
    return this.httpClient.put(url, payload, {
      params: params,
      observe: 'body',
      headers: headers,
      responseType: responseType || 'json',
      reportProgress: true
    });
  }

  public post(url: string, payload: any, responseType?: any, headers?: HttpHeaders): Observable<Object> {
    return this.httpClient.post(url, payload, {
      observe: 'body',
      headers: headers,
      responseType: responseType || 'json',
      reportProgress: true,
    });
  }

  public delete(url: string, responseType?: any, params?: HttpParams, headers?: HttpHeaders): Observable<Object> {
    return this.httpClient.delete(url, {
      params: params,
      observe: 'body',
      headers: headers,
      responseType: responseType || 'json',
      reportProgress: true
    });
  }
}
