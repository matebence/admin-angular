import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlacesPage} from './pages/places/places.page';
import {ParcelsPage} from './pages/parcels/parcels.page';
import {AccountsPage} from './pages/accounts/accounts.page';
import {MessagesPage} from './pages/messages/messages.page';
import {VehiclesPage} from './pages/vehicles/vehicles.page';
import {ShipmentsPage} from './pages/shipments/shipments.page';
import {WarehousesPage} from './pages/warehouses/warehouses.page';

import {UserService} from "../../core/services/user-service/user.service";
import {PlaceService} from "../../core/services/place-service/place.service";
import {ParcelService} from "../../core/services/parcel-service/parcel.service";
import {AccountService} from "../../core/services/account-service/account.service";
import {VehicleService} from "../../core/services/vehicle-service/vehicle.service";
import {ShipmentService} from "../../core/services/shipment-service/shipment.service";
import {MessagingService} from "../../core/services/messaging-service/messaging.service";
import {WarehouseService} from "../../core/services/warehouse-service/warehouse.service";

import {SharedModule} from '../../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  declarations: [
    PlacesPage,
    ParcelsPage,
    AccountsPage,
    MessagesPage,
    VehiclesPage,
    ShipmentsPage,
    WarehousesPage
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    UserService,
    PlaceService,
    ParcelService,
    AccountService,
    VehicleService,
    ShipmentService,
    MessagingService,
    WarehouseService
  ]
})
export class DashboardModule {
}
