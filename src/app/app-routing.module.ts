import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
    pathMatch: 'full'
  },
  {
    path: 'translations',
    loadChildren: './translations/translations.module#TranslationsModule',
  },
  {
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesModule',
  },
  {
    path: 'banners',
    loadChildren: './banners/banners.module#BannersModule',
  },
  {
    path: 'price-requests',
    loadChildren: './price-requests/price-requests.module#PriceRequestsModule',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
