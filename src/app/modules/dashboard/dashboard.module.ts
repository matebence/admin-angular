import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {PlacesPage} from "./pages/places/places.page";
import {ParcelsPage} from "./pages/parcels/parcels.page";
import {AccountsPage} from "./pages/accounts/accounts.page";
import {MessagesPage} from "./pages/messages/messages.page";
import {VehiclesPage} from "./pages/vehicles/vehicles.page";
import {ShipmentsPage} from "./pages/shipments/shipments.page";
import {WarehousesPage} from "./pages/warehouses/warehouses.page";

import {SharedModule} from "../../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";

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
  ]
})
export class DashboardModule {
}
