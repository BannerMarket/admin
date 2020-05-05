import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BannersComponent} from './banners.component';
import {BannersHomeComponent} from './containers/banners-home/banners-home.component';
import {BannersEditComponent} from './containers/banners-edit/banners-edit.component';

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
        path: 'new',
        component: BannersEditComponent
      },
      {
        path: 'edit/:id',
        component: BannersEditComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class BannersRoutingModule {}
