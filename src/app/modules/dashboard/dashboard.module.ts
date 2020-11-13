import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {RoleService} from './services/account-service/role.service';
import {TypeService} from './services/vehicle-service/type.service';
import {PayoutService} from './services/user-service/payout.service';
import {GenderService} from './services/user-service/gender.service';
import {RegionService} from './services/place-service/region.service';
import {PaymentService} from './services/user-service/payment.service';
import {PriceService} from './services/shipment-service/price.service';
import {RatingService} from './services/parcel-service/rating.service';
import {ParcelService} from './services/parcel-service/parcel.service';
import {VillageService} from './services/place-service/village.service';
import {StatusService} from './services/shipment-service/status.service';
import {AccountService} from './services/account-service/account.service';
import {VehicleService} from './services/vehicle-service/vehicle.service';
import {DistrictService} from './services/place-service/district.service';
import {InvoiceService} from './services/shipment-service/invoice.service';
import {CategoryService} from './services/parcel-service/category.service';
import {PrivilegeService} from './services/account-service/prvilege.service';
import {ShipmentService} from './services/shipment-service/shipment.service';
import {WarehouseService} from './services/warehouse-service/warehouse.service';
import {PreferenceService} from './services/account-service/preference.service';

import {BarComponent} from './components/bar/bar.component';
import {NavComponent} from './components/nav/nav.component';
import {LinkComponent} from './components/link/link.component';
import {TileComponent} from './components/tile/tile.component';
import {TableComponent} from './components/table/table.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchComponent} from './components/search/search.component';
import {SummaryComponent} from './components/summary/summary.component';
import {NavItemComponent} from './components/nav-item/nav-item.component';
import {UsersComponent} from './pages/user/components/users/users.component';
import {AssistentComponent} from './components/assistent/assistent.component';
import {TypesComponent} from './pages/vehicle/components/types/types.component';
import {RolesComponent} from './pages/account/components/roles/roles.component';
import {ProfitComponent} from './pages/company/components/profit/profit.component';
import {GendersComponent} from './pages/user/components/genders/genders.component';
import {PayoutsComponent} from './pages/user/components/payouts/payouts.component';
import {RegionsComponent} from './pages/place/components/regions/regions.component';
import {ExplanationComponent} from './components/explanation/explanation.component';
import {StatusComponent} from './pages/shipment/components/status/status.component';
import {RatingsComponent} from './pages/parcel/components/ratings/ratings.component';
import {ParcelsComponent} from './pages/parcel/components/parcels/parcels.component';
import {PaymentsComponent} from './pages/user/components/payments/payments.component';
import {IllustrationComponent} from './components/illustration/illustration.component';
import {VillagesComponent} from './pages/place/components/villages/villages.component';
import {VehiclesComponent} from './pages/vehicle/components/vehicles/vehicles.component';
import {AccountsComponent} from './pages/account/components/accounts/accounts.component';
import {DistrictsComponent} from './pages/place/components/districts/districts.component';
import {InvoicesComponent} from './pages/shipment/components/invoices/invoices.component';
import {UserGraphComponent} from './pages/graph/components/user-graph/user-graph.component';
import {ShipmentsComponent} from './pages/shipment/components/shipments/shipments.component';
import {CategoriesComponent} from './pages/parcel/components/categories/categories.component';
import {WarehousesComponent} from './pages/company/components/warehouses/warehouses.component';
import {PrivilegesComponent} from './pages/account/components/privileges/privileges.component';
import {PlaceGraphComponent} from './pages/graph/components/place-graph/place-graph.component';
import {UsersFormComponent} from './pages/user/components/users/users-form/users-form.component';
import {ParcelGraphComponent} from './pages/graph/components/parcel-graph/parcel-graph.component';
import {PreferencesComponent} from './pages/account/components/preferences/preferences.component';
import {RolesFormComponent} from './pages/account/components/roles/roles-form/roles-form.component';
import {TypesFormComponent} from './pages/vehicle/components/types/types-form/types-form.component';
import {VehicleGraphComponent} from './pages/graph/components/vehicle-graph/vehicle-graph.component';
import {AccountGraphComponent} from './pages/graph/components/account-graph/account-graph.component';
import {ShipmentGraphComponent} from './pages/graph/components/shipment-graph/shipment-graph.component';
import {ProfitFormComponent} from './pages/company/components/profit/profit-form/profit-form.component';
import {StatusFormComponent} from './pages/shipment/components/status/status-form/status-form.component';
import {PayoutsFormComponent} from './pages/user/components/payouts/payouts-form/payouts-form.component';
import {GendersFormComponent} from './pages/user/components/genders/genders-form/genders-form.component';
import {RegionsFormComponent} from './pages/place/components/regions/regions-form/regions-form.component';
import {ParcelsFormComponent} from './pages/parcel/components/parcels/parcels-form/parcels-form.component';
import {RatingsFormComponent} from './pages/parcel/components/ratings/ratings-form/ratings-form.component';
import {PaymentsFormComponent} from './pages/user/components/payments/payments-form/payments-form.component';
import {VillagesFormComponent} from './pages/place/components/villages/villages-form/villages-form.component';
import {AccountsFormComponent} from './pages/account/components/accounts/accounts-form/accounts-form.component';
import {VehiclesFormComponent} from './pages/vehicle/components/vehicles/vehicles-form/vehicles-form.component';
import {DistrictsFormComponent} from './pages/place/components/districts/districts-form/districts-form.component';
import {ShipmentsFormComponent} from './pages/shipment/components/shipments/shipments-form/shipments-form.component';
import {CategoriesFormComponent} from './pages/parcel/components/categories/categories-form/categories-form.component';
import {PrivilegesFormComponent} from './pages/account/components/privileges/privileges-form/privileges-form.component';
import {WarehousesFormComponent} from './pages/company/components/warehouses/warehouses-form/warehouses-form.component';
import {PreferencesFormComponent} from './pages/account/components/preferences/preferences-form/preferences-form.component';

import {SharedModule} from '../../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  declarations: [
    BarComponent,
    NavComponent,
    TileComponent,
    LinkComponent,
    TableComponent,
    RolesComponent,
    UsersComponent,
    TypesComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    ProfitComponent,
    StatusComponent,
    SummaryComponent,
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
    AssistentComponent,
    ShipmentsComponent,
    DistrictsComponent,
    UsersFormComponent,
    TypesFormComponent,
    RolesFormComponent,
    UserGraphComponent,
    PlaceGraphComponent,
    PrivilegesComponent,
    ProfitFormComponent,
    StatusFormComponent,
    CategoriesComponent,
    WarehousesComponent,
    ExplanationComponent,
    ParcelGraphComponent,
    ParcelsFormComponent,
    RatingsFormComponent,
    PayoutsFormComponent,
    GendersFormComponent,
    RegionsFormComponent,
    PreferencesComponent,
    AccountGraphComponent,
    AccountsFormComponent,
    VillagesFormComponent,
    IllustrationComponent,
    VehiclesFormComponent,
    PaymentsFormComponent,
    VehicleGraphComponent,
    ShipmentGraphComponent,
    DistrictsFormComponent,
    ShipmentsFormComponent,
    PrivilegesFormComponent,
    WarehousesFormComponent,
    CategoriesFormComponent,
    PreferencesFormComponent,

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
    ReactiveFormsModule,
    Ng2SmartTableModule,
    DashboardRoutingModule
  ],
  providers: [
    UserService,
    TypeService,
    RoleService,
    PriceService,
    ParcelService,
    PayoutService,
    RegionService,
    RatingService,
    GenderService,
    StatusService,
    AccountService,
    VehicleService,
    PaymentService,
    InvoiceService,
    VillageService,
    ShipmentService,
    CategoryService,
    DistrictService,
    PrivilegeService,
    WarehouseService,
    PreferenceService,

    {provide: 'externalUrlRedirectResolver', useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {window.open((route.data as any).externalUrl);}}
  ]
})
export class DashboardModule {
}
