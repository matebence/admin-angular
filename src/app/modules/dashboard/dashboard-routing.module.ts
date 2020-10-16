import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// 21. Using Angular Modules & Optimizing Apps -> 15. Adding Lazy Loading to the Recipes Module
// 24. Preloading Lazy Loaded Routes
const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
