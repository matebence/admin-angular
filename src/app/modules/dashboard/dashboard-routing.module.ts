import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardPage} from './dashboard.page';
import {UsersPage} from './pages/users/users.page';
import {EurekaPage} from './pages/eureka/eureka.page';
import {ZipkinPage} from './pages/zipkin/zipkin.page';
import {StripePage} from './pages/stripe/stripe.page';
import {ParcelsPage} from './pages/parcels/parcels.page';
import {FirebasePage} from './pages/firebase/firebase.page';
import {VehiclesPage} from './pages/vehicles/vehicles.page';
import {MessagesPage} from './pages/messages/messages.page';
import {ShipmentsPage} from './pages/shipments/shipments.page';
import {WarehousesPage} from './pages/warehouses/warehouses.page';

// 21. Using Angular Modules & Optimizing Apps -> 15. Adding Lazy Loading to the Recipes Module
// 24. Preloading Lazy Loaded Routes
const routes: Routes = [
  {
    path: 'dashboard', component: DashboardPage, children: [
    {
      path: 'services', children: [
      {path: 'users', component: UsersPage},
      {path: 'parcels', component: ParcelsPage},
      {path: 'vehicles', component: VehiclesPage},
      {path: 'messages', component: MessagesPage},
      {path: 'shipments', component: ShipmentsPage},
      {path: 'warehouses', component: WarehousesPage}
    ]
    },
    {
      path: 'internal', children: [
      {path: 'eureka', component: EurekaPage},
      {path: 'zipkin', component: ZipkinPage},
    ]
    },
    {
      path: 'external', children: [
      {path: 'stripe', component: StripePage},
      {path: 'firebase', component: FirebasePage}
    ]
    },
    {path: '**', redirectTo: '/error', pathMatch: 'full'}
  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
