import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../../core/guards/auth.guard';
import {RoleGuard} from '../../core/guards/role.guard';

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

import {environment} from '../../../environments/environment';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [environment.APP_ROLE_ADMIN, environment.APP_ROLE_MANAGER]},
    children: [
      {path: 'home', component: HomePage},
      {path: 'profile', component: ProfilePage},
      {
        path: 'services', component: DashboardPage, children: [
        {
          path: 'users', component: UsersPage, children: [
          {path: 'new'},
          {path: 'edit/:id'},
          {path: 'remove/:id'},
          {path: 'search'},
        ]
        },
        {
          path: 'places', component: PlacesPage, children: [
          {path: 'new'},
          {path: 'edit/:id'},
          {path: 'remove/:id'},
          {path: 'search'},
        ]
        },
        {
          path: 'parcels', component: ParcelsPage, children: [
          {path: 'new'},
          {path: 'edit/:id'},
          {path: 'remove/:id'},
          {path: 'search'},
        ]
        },
        {
          path: 'vehicles', component: VehiclesPage, children: [
          {path: 'new'},
          {path: 'edit/:id'},
          {path: 'remove/:id'},
          {path: 'search'},
        ]
        },
        {
          path: 'messages', component: MessagesPage, children: [
          {path: 'new'},
          {path: 'edit/:id'},
          {path: 'remove/:id'},
          {path: 'search'},
        ]
        },
        {
          path: 'shipments', component: ShipmentsPage, children: [
          {path: 'new'},
          {path: 'edit/:id'},
          {path: 'remove/:id'},
          {path: 'search'},
        ]
        },
        {
          path: 'warehouses', component: WarehousesPage, children: [
          {path: 'new'},
          {path: 'edit/:id'},
          {path: 'remove/:id'},
          {path: 'search'},
        ]
        },
        {
          path: 'graph', component: GraphPage, children: [
          {path: 'users'},
          {path: 'shipments'},
          {path: 'parcels'},
          {path: 'messages'},
          {path: 'places'},
          {path: 'warehouses'}
        ]
        },
        {
          path: 'profit', component: ProfitPage, children: [
          {path: 'current'},
          {path: 'edit'}
        ]
        },
        {
          path: 'internal', children: [
          {
            path: 'eureka',
            resolve: {
              url: 'externalUrlRedirectResolver'
            },
            data: {
              externalUrl: 'http://192.168.99.100:8761'
            }
          },
          {
            path: 'zipkin',
            resolve: {
              url: 'externalUrlRedirectResolver'
            },
            data: {
              externalUrl: 'http://192.168.99.100:9411'
            }
          }
        ]
        },
        {
          path: 'external', children: [
          {
            path: 'stripe',
            resolve: {
              url: 'externalUrlRedirectResolver'
            },
            data: {
              externalUrl: 'https://dashboard.stripe.com/login'
            }
          },
          {
            path: 'firebase',
            resolve: {
              url: 'externalUrlRedirectResolver'
            },
            data: {
              externalUrl: 'https://firebase.google.com/'
            }
          }
        ]
        }
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
