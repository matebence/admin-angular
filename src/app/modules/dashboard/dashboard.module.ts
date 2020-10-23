import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardPage} from './dashboard.page';
import {UsersPage} from './pages/users/users.page';
import {EurekaPage} from './pages/eureka/eureka.page';
import {ZipkinPage} from './pages/zipkin/zipkin.page';
import {StripePage} from './pages/stripe/stripe.page';
import {PlacesPage} from './pages/places/places.page';
import {ParcelsPage} from './pages/parcels/parcels.page';
import {FirebasePage} from './pages/firebase/firebase.page';
import {MessagesPage} from './pages/messages/messages.page';
import {VehiclesPage} from './pages/vehicles/vehicles.page';
import {ShipmentsPage} from './pages/shipments/shipments.page';
import {WarehousesPage} from './pages/warehouses/warehouses.page';

import {UserService} from './services/user-service/user.service';
import {PlaceService} from './services/place-service/place.service';
import {ParcelService} from './services/parcel-service/parcel.service';
import {AccountService} from './services/account-service/account.service';
import {VehicleService} from './services/vehicle-service/vehicle.service';
import {ShipmentService} from './services/shipment-service/shipment.service';
import {MessagingService} from './services/messaging-service/messaging.service';
import {WarehouseService} from './services/warehouse-service/warehouse.service';

import {BarComponent} from './components/bar/bar.component';
import {NavComponent} from './components/nav/nav.component';
import {TableComponent} from './components/table/table.component';
import {TilesComponent} from './components/tiles/tiles.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavItemComponent} from './components/nav-item/nav-item.component';

import {SharedModule} from '../../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  declarations: [
    BarComponent,
    NavComponent,
    TableComponent,
    TilesComponent,
    HeaderComponent,
    FooterComponent,
    NavItemComponent,

    UsersPage,
    PlacesPage,
    EurekaPage,
    ZipkinPage,
    StripePage,
    ParcelsPage,
    FirebasePage,
    MessagesPage,
    VehiclesPage,
    DashboardPage,
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
