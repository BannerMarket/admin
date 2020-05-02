import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';
import {SharedModule} from '../shared/shared.module';
import {BannersRoutingModule} from './banners-routing.module';
import {BannersHomeComponent} from './containers/banners-home/banners-home.component';
import { BannersEditComponent } from './containers/banners-edit/banners-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BannerRowComponent } from './components/banner-row/banner-row.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BannersRoutingModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  declarations: [
    BannersComponent,
    BannersHomeComponent,
    BannersEditComponent,
    BannerRowComponent
  ]
})
export class BannersModule { }
