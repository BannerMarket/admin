import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PriceRequestsComponent} from './price-requests.component';

const routes: Routes = [
  {
    path: '',
    component: PriceRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class PriceRequestsRoutingModule {}
