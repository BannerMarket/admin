import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import {SharedModule} from '../shared/shared.module';
import { AddCategoryModalComponent } from './components/add-category-modal/add-category-modal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],
  declarations: [CategoriesComponent, AddCategoryModalComponent]
})
export class CategoriesModule { }
