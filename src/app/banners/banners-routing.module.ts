import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BannersComponent} from './banners.component';
import {BannersHomeComponent} from './containers/banners-home/banners-home.component';
import {BannersListComponent} from './containers/banners-list/banners-list.component';

const routes: Routes = [
  {
    path: '',
    component: BannersComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BannersHomeComponent
      },
      {
        path: 'list',
        component: BannersListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class BannersRoutingModule {}
