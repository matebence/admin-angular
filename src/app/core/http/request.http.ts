import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class RequestHTTP {

  private readonly GET: string = 'GET';
  private readonly PUT: string = 'PUT';
  private readonly POST: string = 'POST';
  private readonly DELETE: string = 'DELETE';

  public constructor(private httpClient: HttpClient) {
  }

  public get(url: string, params: HttpParams, headers?: HttpHeaders) {
    return this.httpClient.request(new HttpRequest(this.GET, url,  {
      params: params,
      observe: 'body',
      headers: headers,
      responseType: 'json',
      reportProgress: true
    }));
  }

  public put(url: string, payload: any, params: HttpParams, headers?: HttpHeaders) {
    return this.httpClient.request(new HttpRequest(this.PUT, url, payload, {
      params: params,
      observe: 'body',
      headers: headers,
      responseType: 'json',
      reportProgress: true
    }));
  }

  public post(url: string, payload: any, headers?: HttpHeaders) {
    return this.httpClient.request(new HttpRequest(this.POST, url, payload, {
      observe: 'body',
      headers: headers,
      responseType: 'json',
      reportProgress: true,
    }));
  }

  public delete(url: string, params: HttpParams, headers?: HttpHeaders) {
    return this.httpClient.request(new HttpRequest(this.DELETE, url, {
      params: params,
      observe: 'body',
      headers: headers,
      responseType: 'json',
      reportProgress: true
    }));
  }
}
