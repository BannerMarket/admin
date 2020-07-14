import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {RegisterRouterModule} from './register-router.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
