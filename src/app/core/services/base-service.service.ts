import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

import {RouteBuilder} from "../http/route-builder.http";

@Injectable()
export class BaseServiceService {

  public constructor(private httpClient: HttpClient, private routeBuilder: RouteBuilder) {
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error);
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
