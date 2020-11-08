import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs/index';
import {EventEmitter, Injectable} from '@angular/core';
import {catchError, switchMap} from 'rxjs/internal/operators';

import {TypeService} from './type.service';
import {UserService} from '../user-service/user.service';
import {BaseService} from '../../../../core/services/base.service';

import {Vehicle} from '../../../../shared/models/services/vehicle/vehicle.model';

import {RequestHTTP} from '../../../../core/http/request.http';
import {RouteBuilder} from '../../../../core/http/route-builder.http';
import {Type} from "../../../../shared/models/services/vehicle/type.model";
import {User} from "../../../../shared/models/services/user/user.model";

@Injectable()
export class VehicleService extends BaseService {

  private createData: Vehicle = null;
  private getAllData: Vehicle[] = null;

  public createDataObservable: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();
  public getAllDataObservable: EventEmitter<Vehicle[]> = new EventEmitter<Vehicle[]>();

  public constructor(private typeService: TypeService,
                     private userService: UserService,
                     private requestHttp: RequestHTTP,
                     private routeBuilder: RouteBuilder,) {
    super();
  }

  public create(formGroup: FormGroup): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('create')
      .build();

    this.requestHttp
      .post(url, formGroup.value)
      .pipe(catchError(super.handleError.bind(this)))
      .pipe(switchMap((data: Vehicle) => {
        this.setCreateData(data);
        this.typeService.get(formGroup.value.type);
        return this.userService.get(formGroup.value.courier);
      }))
      .subscribe((result: boolean) => {
        if (!result) return;

        let vehicles: Vehicle[] = this.getGetAllData();
        const user: User = this.userService.getGetData();
        vehicles.unshift({...this.getCreateData(), courier: {courierId: user.accountId, userName: user.userName, email: user.email}, type: this.typeService.getGetData()});
        this.setGetAllData(vehicles);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public update(vehicle: Vehicle): Observable<boolean> {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('update')
      .params([{id: vehicle._id}])
      .build();

    this.requestHttp
      .put(url, vehicle)
      .pipe(catchError(super.handleError.bind(this)))
      .pipe(switchMap(() => {
        this.typeService.get(vehicle.type._id);
        return this.userService.get(vehicle.courier.courierId);
      }))
      .subscribe((result: boolean) => {
        if (!result) return;

        const user: User = this.userService.getGetData();
        let vehicles: Vehicle[] = this.getGetAllData().filter(e => e._id != vehicle._id);
        vehicles.unshift({...vehicle, courier: {courierId: user.accountId, userName: user.userName, email: user.email}, type: this.typeService.getGetData()});
        this.setGetAllData(vehicles);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public delete(id: string) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('delete')
      .params([{id: id}])
      .build();

    this.requestHttp
      .delete(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe(() => {
        let vehicles: Vehicle[] = this.getGetAllData().filter(e => e._id != id);
        this.setGetAllData(vehicles);

        return subject.next(true);
      });
    return subject.asObservable();
  }

  public getAll(page: number, limit: number) {
    const subject = new Subject<boolean>();
    const url = this.routeBuilder
      .service('vehicle-service')
      .model('vehicles')
      .action('getAll')
      .params([{page: page}, {limit: limit}])
      .build();

    this.requestHttp
      .get(url)
      .pipe(catchError(super.handleError.bind(this)))
      .subscribe((data: Vehicle[]) => {

        this.setGetAllData(data);
        return subject.next(true);
      });
    return subject.asObservable();
  }

  public setCreateData(data: Vehicle): void {
    this.createData = data;
    this.createDataObservable.emit(this.getCreateData());
    return;
  }

  public getCreateData(): Vehicle {
    return Object.assign({}, this.createData);
  }

  public setGetAllData(data: Vehicle[]): void {
    this.getAllData = data;
    this.getAllDataObservable.emit(this.getGetAllData());
    return;
  }

  public getGetAllData(): Vehicle[] {
    return Object.assign([], this.getAllData);
  }
}
