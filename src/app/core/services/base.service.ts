import {Observable, throwError} from 'rxjs';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {Error} from '../../shared/models/error/error.model';

@Injectable()
export class BaseService {

  private errorData: Error = null;
  public errorDataObservable: EventEmitter<Error> = new EventEmitter<Error>();

  public constructor() {
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.group(`Internal application error happened`);
      console.error('An error occurred:', error.error.message);
      console.log(error);
      console.groupEnd();
    } else {
      if (error.status > 0) {
        console.group(`Backend error happened`);
        console.error(`Returned code ${error.status}, ` + `body was:`);
        console.log(error.error);
        console.groupEnd();
      } else {
        console.group(`Server is down`);
        console.error('An error occurred:', error.message);
        console.log(error);
        console.groupEnd();
      }
    }

    const message = error.error.message ? error.error.message : 'Server je momentálne nedostupný';
    this.setErrorData({timestamp: new Date().toISOString(), message: message, error: true});
    return throwError(error.message);
  }

  public setErrorData(data: Error): void {
    this.errorData = data;
    this.errorDataObservable.emit(this.getErrorData())
  }

  public getErrorData(): Error {
    return Object.assign({}, this.errorData);
  }
}
