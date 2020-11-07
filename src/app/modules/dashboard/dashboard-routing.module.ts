import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../../core/guards/auth.guard';
import {RoleGuard} from '../../core/guards/role.guard';
import {LeaveGuard} from '../../core/guards/leave.guard';

import {environment} from '../../../environments/environment';

import {UsersComponent} from './pages/user/components/users/users.component';
import {RolesComponent} from './pages/account/components/roles/roles.component';
import {TypesComponent} from './pages/vehicle/components/types/types.component';
import {GendersComponent} from './pages/user/components/genders/genders.component';
import {ProfitComponent} from './pages/company/components/profit/profit.component';
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
import {UserGraphComponent} from './pages/graph/components/user-graph/user-graph.component';
import {ShipmentsComponent} from './pages/shipment/components/shipments/shipments.component';
import {CategoriesComponent} from './pages/parcel/components/categories/categories.component';
import {PrivilegesComponent} from './pages/account/components/privileges/privileges.component';
import {PlaceGraphComponent} from './pages/graph/components/place-graph/place-graph.component';
import {WarehousesComponent} from './pages/company/components/warehouses/warehouses.component';
import {UsersFormComponent} from './pages/user/components/users/users-form/users-form.component';
import {ParcelGraphComponent} from './pages/graph/components/parcel-graph/parcel-graph.component';
import {PreferencesComponent} from './pages/account/components/preferences/preferences.component';
import {RolesFormComponent} from './pages/account/components/roles/roles-form/roles-form.component';
import {TypesFormComponent} from './pages/vehicle/components/types/types-form/types-form.component';
import {VehicleGraphComponent} from './pages/graph/components/vehicle-graph/vehicle-graph.component';
import {AccountGraphComponent} from './pages/graph/components/account-graph/account-graph.component';
import {ShipmentGraphComponent} from './pages/graph/components/shipment-graph/shipment-graph.component';
import {ProfitFormComponent} from './pages/company/components/profit/profit-form/profit-form.component';
import {GendersFormComponent} from './pages/user/components/genders/genders-form/genders-form.component';
import {PayoutsFormComponent} from './pages/user/components/payouts/payouts-form/payouts-form.component';
import {StatusFormComponent} from './pages/shipment/components/status/status-form/status-form.component';
import {RegionsFormComponent} from './pages/place/components/regions/regions-form/regions-form.component';
import {RatingsFormComponent} from './pages/parcel/components/ratings/ratings-form/ratings-form.component';
import {ParcelsFormComponent} from './pages/parcel/components/parcels/parcels-form/parcels-form.component';
import {PaymentsFormComponent} from './pages/user/components/payments/payments-form/payments-form.component';
import {VillagesFormComponent} from './pages/place/components/villages/villages-form/villages-form.component';
import {VehiclesFormComponent} from './pages/vehicle/components/vehicles/vehicles-form/vehicles-form.component';
import {AccountsFormComponent} from './pages/account/components/accounts/accounts-form/accounts-form.component';
import {InvoicesFormComponent} from './pages/shipment/components/invoices/invoices-form/invoices-form.component';
import {DistrictsFormComponent} from './pages/place/components/districts/districts-form/districts-form.component';
import {ShipmentsFormComponent} from './pages/shipment/components/shipments/shipments-form/shipments-form.component';
import {CategoriesFormComponent} from './pages/parcel/components/categories/categories-form/categories-form.component';
import {PrivilegesFormComponent} from './pages/account/components/privileges/privileges-form/privileges-form.component';
import {WarehousesFormComponent} from './pages/company/components/warehouses/warehouses-form/warehouses-form.component';
import {PreferencesFormComponent} from './pages/account/components/preferences/preferences-form/preferences-form.component';

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
        data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
      },
      {
        path: 'profile',
        component: ProfilePage,
        data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
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
                children: [
                  {
                    path: 'new',
                    component: UsersFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: UsersFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/payouts',
                component: PayoutsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
                children: [
                  {
                    path: 'new',
                    component: PayoutsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: PayoutsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/payments',
                component: PaymentsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
                children: [
                  {
                    path: 'new',
                    component: PaymentsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: PaymentsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/genders',
                component: GendersComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: GendersFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: GendersFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
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
                children: [
                  {
                    path: 'new',
                    component: AccountsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: AccountsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/preferences',
                component: PreferencesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: PreferencesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: PreferencesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
              },
              {
                path: 'table/privileges',
                component: PrivilegesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: PrivilegesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: PrivilegesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
              },
              {
                path: 'table/roles',
                component: RolesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: RolesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: RolesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
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
                children: [
                  {
                    path: 'new',
                    component: ShipmentsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: ShipmentsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/invoices',
                component: InvoicesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: ':id',
                    component: InvoicesComponent,
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'new',
                    component: InvoicesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: InvoicesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
              },
              {
                path: 'table/status',
                component: StatusComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: StatusFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: StatusFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
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
                children: [
                  {
                    path: 'new',
                    component: ParcelsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: ParcelsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/ratings',
                component: RatingsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
                children: [
                  {
                    path: 'new',
                    component: RatingsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: RatingsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/categories',
                component: CategoriesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: CategoriesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: CategoriesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
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
                children: [
                  {
                    path: 'new',
                    component: RegionsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: RegionsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
              },
              {
                path: 'table/districts',
                component: DistrictsComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: DistrictsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: DistrictsFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
              },
              {
                path: 'table/villages',
                component: VillagesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: VillagesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: VillagesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
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
                children: [
                  {
                    path: 'new',
                    component: VehiclesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  },
                  {
                    path: 'edit/:id',
                    component: VehiclesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
                  }
                ]
              },
              {
                path: 'table/types',
                component: TypesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: TypesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: TypesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
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
                component: ProfitComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: ProfitFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: ProfitFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
              },
              {
                path: 'warehouses',
                component: WarehousesComponent,
                data: {roles: [environment.APP_ROLE_ADMIN]},
                children: [
                  {
                    path: 'new',
                    component: WarehousesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  },
                  {
                    path: 'edit/:id',
                    component: WarehousesFormComponent,
                    canDeactivate: [LeaveGuard],
                    data: {roles: [environment.APP_ROLE_ADMIN]}
                  }
                ]
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
                component: UserGraphComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
              },
              {
                path: 'accounts',
                component: AccountGraphComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
              },
              {
                path: 'shipments',
                component: ShipmentGraphComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
              },
              {
                path: 'parcels',
                component: ParcelGraphComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
              },
              {
                path: 'places',
                component: PlaceGraphComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
              },
              {
                path: 'vehicles',
                component: VehicleGraphComponent,
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
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
