import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslationsComponent} from './translations.component';
import {TranslationsRoutingModule} from './translations.routing.module';
import {SharedModule} from '../shared/shared.module';
import {TranslationRowComponent} from './components/translation-row/translation-row.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslationsRoutingModule,
    SharedModule,
    ScrollingModule,
    FormsModule,
  ],
  declarations: [
    TranslationsComponent,
    TranslationRowComponent,
  ]
})
export class TranslationsModule { }
