import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslationsComponent} from './translations.component';
import {TranslationsRoutingModule} from './translations.routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslationsRoutingModule
  ],
  declarations: [
    TranslationsComponent,
  ]
})
export class TranslationsModule { }
