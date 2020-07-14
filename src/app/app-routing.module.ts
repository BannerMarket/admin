import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'translations',
    loadChildren: './translations/translations.module#TranslationsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'banners',
    loadChildren: './banners/banners.module#BannersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'price-requests',
    loadChildren: './price-requests/price-requests.module#PriceRequestsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
