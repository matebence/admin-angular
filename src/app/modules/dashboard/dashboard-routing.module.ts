import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../../core/guards/auth.guard';
import {RoleGuard} from '../../core/guards/role.guard';

import {environment} from '../../../environments/environment';

import {UsersComponent} from './pages/user/components/users/users.component';
import {RolesComponent} from './pages/account/components/roles/roles.component';
import {TypesComponent} from './pages/vehicle/components/types/types.component';
import {GendersComponent} from './pages/user/components/genders/genders.component';
import {PayoutsComponent} from './pages/user/components/payouts/payouts.component';
import {StatusComponent} from './pages/shipment/components/status/status.component';
import {RegionsComponent} from './pages/place/components/regions/regions.component';
import {RatingsComponent} from './pages/parcel/components/ratings/ratings.component';
import {ParcelsComponent} from './pages/parcel/components/parcels/parcels.component';
import {PaymentsComponent} from './pages/user/components/payments/payments.component';
import {VillagesComponent} from './pages/place/components/villages/villages.component';
import {AccountsComponent} from './pages/account/components/accounts/accounts.component';
import {VehiclesComponent} from './pages/vehicle/components/vehicles/vehicles.component';
import {DistrictsComponent} from './pages/place/components/districts/districts.component';
import {InvoicesComponent} from './pages/shipment/components/invoices/invoices.component';
import {ShipmentsComponent} from './pages/shipment/components/shipments/shipments.component';
import {CategoriesComponent} from './pages/parcel/components/categories/categories.component';
import {PrivilegesComponent} from './pages/account/components/privileges/privileges.component';
import {PreferencesComponent} from './pages/account/components/preferences/preferences.component';

import {DashboardPage} from './dashboard.page';
import {HomePage} from './pages/home/home.page';
import {UserPage} from './pages/user/user.page';
import {GraphPage} from './pages/graph/graph.page';
import {PlacePage} from './pages/place/place.page';
import {ParcelPage} from './pages/parcel/parcel.page';
import {ProfilePage} from './pages/profile/profile.page';
import {CompanyPage} from './pages/company/company.page';
import {VehiclePage} from './pages/vehicle/vehicle.page';
import {AccountPage} from './pages/account/account.page';
import {ShipmentPage} from './pages/shipment/shipment.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    children: [
      {
        path: 'home',
        component: HomePage,
        data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
      },
      {
        path: 'profile',
        component: ProfilePage,
        data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
      },
      {
        path: 'services',
        component: DashboardPage,
        data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
        children: [
          {
            path: 'users',
            component: UserPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'table',
                component: UsersComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/payouts',
                component: PayoutsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/payments',
                component: PaymentsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/genders',
                component: GendersComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              }
            ]
          },
          {
            path: 'accounts',
            component: AccountPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'table',
                component: AccountsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/preferences',
                component: PreferencesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
              {
                path: 'table/privileges',
                component: PrivilegesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
              {
                path: 'table/roles',
                component: RolesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              }
            ]
          },
          {
            path: 'shipments',
            component: ShipmentPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'table',
                component: ShipmentsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/invoices',
                component: InvoicesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/status',
                component: StatusComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              }
            ]
          },
          {
            path: 'parcels',
            component: ParcelPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'table',
                component: ParcelsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/ratings',
                component: RatingsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/categories',
                component: CategoriesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
            ]
          },
          {
            path: 'places',
            component: PlacePage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'table/regions',
                component: RegionsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
              {
                path: 'table/districts',
                component: DistrictsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
              {
                path: 'table/villages',
                component: VillagesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              }
            ]
          },
          {
            path: 'vehicles',
            component: VehiclePage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'table',
                component: VehiclesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'table/types',
                component: TypesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
              }
            ]
          },
          {
            path: 'company',
            component: CompanyPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'profit',
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
              {
                path: 'warehouses',
                data: {roles: [environment.APP_ROLE_ADMIN]},
              }
            ]
          },
          {
            path: 'graph',
            component: GraphPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'users',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'shipments',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'parcels',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'messages',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'places',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'warehouses',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              }
            ]
          },
          {
            path: 'internal',
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'eureka',
                resolve: {
                  url: 'externalUrlRedirectResolver'
                },
                data: {
                  externalUrl: 'http://192.168.99.100:8761',
                  roles: [environment.APP_ROLE_ADMIN]
                }
              },
              {
                path: 'zipkin',
                resolve: {
                  url: 'externalUrlRedirectResolver'
                },
                data: {
                  externalUrl: 'http://192.168.99.100:9411',
                  roles: [environment.APP_ROLE_ADMIN]
                }
              }
            ]
          },
          {
            path: 'external',
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'stripe',
                resolve: {
                  url: 'externalUrlRedirectResolver'
                },
                data: {
                  externalUrl: 'https://dashboard.stripe.com/login',
                  roles: [environment.APP_ROLE_ADMIN]
                }
              },
              {
                path: 'firebase',
                resolve: {
                  url: 'externalUrlRedirectResolver'
                },
                data: {
                  externalUrl: 'https://firebase.google.com/',
                  roles: [environment.APP_ROLE_ADMIN]
                }
              }
            ]
          }
        ]
      },
      {
        path: '**',
        redirectTo: '/error',
        pathMatch: 'full'
      }
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
