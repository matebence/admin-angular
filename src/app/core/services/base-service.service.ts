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
      console.log(error);
      console.error('An error occurred:', error.error.message);
    } else {
      console.group(`Backend returned code ${error.status}, ` + `body was:`);
      console.log(error.error);
      console.groupEnd();
    }

    this.setErrorData(error.error);
    return throwError(error.error.message);
  }

  public setErrorData(data: Error): void {
    this.errorData = data;
    this.errorDataObservable.emit(this.getErrorData())
  }

  public getErrorData(): Error {
    return Object.assign({}, this.errorData);
  }
}
