import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';
import {SharedModule} from '../shared/shared.module';
import {BannersRoutingModule} from './banners-routing.module';
import {BannersHomeComponent} from './containers/banners-home/banners-home.component';
import { BannersListComponent } from './containers/banners-list/banners-list.component';
import { BannersEditComponent } from './containers/banners-edit/banners-edit.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BannersRoutingModule,
        ReactiveFormsModule,
    ],
  declarations: [
    BannersComponent,
    BannersHomeComponent,
    BannersListComponent,
    BannersEditComponent
  ]
})
export class BannersModule { }
