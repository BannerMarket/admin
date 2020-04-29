import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';
import {SharedModule} from '../shared/shared.module';
import {BannersRoutingModule} from './banners-routing.module';
import {BannersHomeComponent} from './containers/banners-home/banners-home.component';
import { BannersListComponent } from './containers/banners-list/banners-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BannersRoutingModule,
  ],
  declarations: [
    BannersComponent,
    BannersHomeComponent,
    BannersListComponent
  ]
})
export class BannersModule { }
