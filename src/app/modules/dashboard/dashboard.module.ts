import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {DashboardPage} from './dashboard.page';
import {HomePage} from './pages/home/home.page';
import {UserPage} from './pages/user/user.page';
import {GraphPage} from './pages/graph/graph.page';
import {PlacePage} from './pages/place/place.page';
import {ParcelPage} from './pages/parcel/parcel.page';
import {AccountPage} from './pages/account/account.page';
import {ProfilePage} from './pages/profile/profile.page';
import {CompanyPage} from './pages/company/company.page';
import {VehiclePage} from './pages/vehicle/vehicle.page';
import {ShipmentPage} from './pages/shipment/shipment.page';

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
import {NavItemComponent} from './components/nav-item/nav-item.component';
import {UsersComponent} from './pages/user/components/users/users.component';
import {TypesComponent} from './pages/vehicle/components/types/types.component';
import {RolesComponent} from './pages/account/components/roles/roles.component';
import {GendersComponent} from './pages/user/components/genders/genders.component';
import {PayoutsComponent} from './pages/user/components/payouts/payouts.component';
import {RegionsComponent} from './pages/place/components/regions/regions.component';
import {StatusComponent} from './pages/shipment/components/status/status.component';
import {RatingsComponent} from './pages/parcel/components/ratings/ratings.component';
import {ParcelsComponent} from './pages/parcel/components/parcels/parcels.component';
import {PaymentsComponent} from './pages/user/components/payments/payments.component';
import {TableCellComponent} from './components/table/table-cell/table-cell.component';
import {VillagesComponent} from './pages/place/components/villages/villages.component';
import {VehiclesComponent} from './pages/vehicle/components/vehicles/vehicles.component';
import {AccountsComponent} from './pages/account/components/accounts/accounts.component';
import {DistrictsComponent} from './pages/place/components/districts/districts.component';
import {InvoicesComponent} from './pages/shipment/components/invoices/invoices.component';
import {ShipmentsComponent} from './pages/shipment/components/shipments/shipments.component';
import {CategoriesComponent} from './pages/parcel/components/categories/categories.component';
import {PrivilegesComponent} from './pages/account/components/privileges/privileges.component';
import {PreferencesComponent} from './pages/account/components/preferences/preferences.component';
import {CellEditorComponent} from './components/table/table-cell/cell-editor/cell-editor.component';

import {SharedModule} from '../../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  declarations: [
    BarComponent,
    NavComponent,
    TableComponent,
    TilesComponent,
    RolesComponent,
    UsersComponent,
    TypesComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    StatusComponent,
    NavItemComponent,
    RatingsComponent,
    ParcelsComponent,
    RegionsComponent,
    PayoutsComponent,
    GendersComponent,
    InvoicesComponent,
    VehiclesComponent,
    PaymentsComponent,
    VillagesComponent,
    AccountsComponent,
    ShipmentsComponent,
    DistrictsComponent,
    TableCellComponent,
    CellEditorComponent,
    PrivilegesComponent,
    CategoriesComponent,
    PreferencesComponent,

    HomePage,
    UserPage,
    GraphPage,
    PlacePage,
    ParcelPage,
    ProfilePage,
    CompanyPage,
    VehiclePage,
    AccountPage,
    ShipmentPage,
    DashboardPage
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    Ng2SmartTableModule,
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
    {
      provide: 'externalUrlRedirectResolver', useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      window.open((route.data as any).externalUrl);
    }
    }
  ]
})
export class DashboardModule {
}
