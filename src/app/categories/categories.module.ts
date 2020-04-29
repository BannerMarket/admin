import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import {SharedModule} from '../shared/shared.module';
import { AddCategoryModalComponent } from './components/add-category-modal/add-category-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CategoryRowComponent } from './components/category-row/category-row.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ScrollingModule,
    FormsModule,
  ],
  declarations: [CategoriesComponent, AddCategoryModalComponent, CategoryRowComponent]
})
export class CategoriesModule { }
