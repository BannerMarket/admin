import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceRequestsComponent } from './price-requests.component';
import {PriceRequestsRoutingModule} from './price-requests-routing.module';
import {SharedModule} from '../shared/shared.module';
import { RequestRowComponent } from './components/request-row/request-row.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    PriceRequestsRoutingModule,
    SharedModule,
    ScrollingModule,
  ],
  declarations: [PriceRequestsComponent, RequestRowComponent]
})
export class PriceRequestsModule { }
