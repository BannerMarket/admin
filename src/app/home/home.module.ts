import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import { HeroImagesComponent } from './components/hero-images/hero-images.component';
import { PromotedBannersComponent } from './components/promoted-banners/promoted-banners.component';

@NgModule({
  declarations: [HomeComponent, HeroImagesComponent, PromotedBannersComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
