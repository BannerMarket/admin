import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {RouterModule} from '@angular/router';
import {ButtonComponent} from './components/reusable/button/button.component';
import {FormInputComponent} from './components/reusable/form-input/form-input.component';
import {CheckboxComponent} from './components/reusable/checkbox/checkbox.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    SideMenuComponent,
    ButtonComponent,
    FormInputComponent,
    CheckboxComponent,
  ],
  exports: [
    SideMenuComponent,
    ButtonComponent,
    FormInputComponent,
    CheckboxComponent,
  ]
})
export class SharedModule { }
