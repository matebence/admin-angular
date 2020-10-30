import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../../core/guards/auth.guard';
import {RoleGuard} from '../../core/guards/role.guard';

import {environment} from '../../../environments/environment';

import {DashboardPage} from './dashboard.page';
import {HomePage} from './pages/home/home.page';
import {UsersPage} from './pages/users/users.page';
import {GraphPage} from './pages/graph/graph.page';
import {ProfitPage} from './pages/profit/profit.page';
import {PlacesPage} from './pages/places/places.page';
import {ProfilePage} from './pages/profile/profile.page';
import {ParcelsPage} from './pages/parcels/parcels.page';
import {VehiclesPage} from './pages/vehicles/vehicles.page';
import {MessagesPage} from './pages/messages/messages.page';
import {ShipmentsPage} from './pages/shipments/shipments.page';
import {WarehousesPage} from './pages/warehouses/warehouses.page';

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
            component: UsersPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'new',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'edit/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'remove/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'search',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
            ]
          },
          {
            path: 'places',
            component: PlacesPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'new',
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
              {
                path: 'edit/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'remove/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'search',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
            ]
          },
          {
            path: 'parcels',
            component: ParcelsPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'new',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'edit/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'remove/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'search',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
            ]
          },
          {
            path: 'vehicles',
            component: VehiclesPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'new',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'edit/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'remove/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'search',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
            ]
          },
          {
            path: 'messages',
            component: MessagesPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'new',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'edit/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'remove/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'search',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
            ]
          },
          {
            path: 'shipments',
            component: ShipmentsPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'new',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'edit/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'remove/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'search',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
            ]
          },
          {
            path: 'warehouses',
            component: WarehousesPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'new',
                data: {roles: [environment.APP_ROLE_ADMIN]},
              },
              {
                path: 'edit/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'remove/:id',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
              {
                path: 'search',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
              },
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
            path: 'profit',
            component: ProfitPage,
            data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
            children: [
              {
                path: 'current',
                data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]}
              },
              {
                path: 'edit',
                data: {roles: [environment.APP_ROLE_ADMIN]}
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
