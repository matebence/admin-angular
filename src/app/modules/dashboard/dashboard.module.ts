import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {DashboardPage} from './dashboard.page';
import {HomePage} from './pages/home/home.page';
import {GraphPage} from './pages/graph/graph.page';
import {UsersPage} from './pages/users/users.page';
import {ProfitPage} from './pages/profit/profit.page';
import {PlacesPage} from './pages/places/places.page';
import {ParcelsPage} from './pages/parcels/parcels.page';
import {ProfilePage} from './pages/profile/profile.page';
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
import {SearchComponent} from './components/search/search.component';
import {ScrollComponent} from './components/scroll/scroll.component';
import {NavItemComponent} from './components/nav-item/nav-item.component';

import {SharedModule} from '../../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  declarations: [
    BarComponent,
    NavComponent,
    TableComponent,
    TilesComponent,
    SearchComponent,
    ScrollComponent,
    HeaderComponent,
    FooterComponent,
    NavItemComponent,

    HomePage,
    GraphPage,
    UsersPage,
    PlacesPage,
    ProfitPage,
    ProfilePage,
    ParcelsPage,
    MessagesPage,
    VehiclesPage,
    DashboardPage,
    ShipmentsPage,
    WarehousesPage,
  ],
  imports: [
    FormsModule,
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
    WarehouseService,
    {provide: 'externalUrlRedirectResolver', useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {window.open((route.data as any).externalUrl);}}
  ]
})
export class DashboardModule {
}
