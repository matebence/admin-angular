import {Subscription} from 'rxjs/index';
import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {environment} from '../../../../../environments/environment';

import {UserService} from '../../services/user-service/user.service';
import {PriceService} from '../../services/shipment-service/price.service';
import {ParcelService} from '../../services/parcel-service/parcel.service';
import {ShipmentService} from '../../services/shipment-service/shipment.service';

import {User} from '../../../../shared/models/services/user/user.model';
import {Price} from '../../../../shared/models/services/shipment/price.model';
import {Parcel} from '../../../../shared/models/services/parcel/parcel.model';
import {Shipment} from '../../../../shared/models/services/shipment/shipment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  public summary: any = [];
  public userCount: number;
  public parcelCount: number;
  public courierCount: number;
  public companyProfit: number;
  public profitId: string = environment.COMPANY_PROFIT_ID;

  private subscriptions: Subscription[] = [];

  public constructor(private userService: UserService,
                     private priceService: PriceService,
                     private parcelService: ParcelService,
                     private shipmentService: ShipmentService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getAll(0, 100)
        .pipe(switchMap((users: User[]) => {
          this.userCount = users.length;
          return this.parcelService.getAll(1, 100);
        }))
        .pipe(switchMap((parcels: Parcel[]) => {
          this.parcelCount = parcels.length;
          return this.userService.search({
            pagination: {pageNumber: 0, pageSize: 100},
            search: {roles: environment.APP_ROLE_COURIER}
          });
        }))
        .pipe(switchMap((users: User[]) => {
          this.courierCount = users.length;
          return this.priceService.get(environment.COMPANY_PROFIT_ID);
        }))
        .pipe(switchMap((profit: Price) => {
          this.companyProfit = profit.price;
          return this.shipmentService.getAll(1, 100);
        }))
        .subscribe((shipments: Shipment[]) => {
          this.summary.push({title: 'Zásielky/Kuriéry', min: 0, max: this.courierCount, current: shipments.length})
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }
}
