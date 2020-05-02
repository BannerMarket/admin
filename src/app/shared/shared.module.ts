import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {RouterModule} from '@angular/router';
import {ButtonComponent} from './components/reusable/button/button.component';
import {FormInputComponent} from './components/reusable/form-input/form-input.component';
import {CheckboxComponent} from './components/reusable/checkbox/checkbox.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotificationsComponent } from './components/reusable/notifications/notifications.component';
import { NotificationComponent } from './components/reusable/notifications/notification/notification.component';
import { ModalComponent } from './components/reusable/modal/modal.component';
import { InputComponent } from './components/reusable/input/input.component';
import { TranslatePipe } from './pipes/translate.pipe';
import {CategorySelectionComponent} from './components/reusable/category-selection/category-selection.component';
import { CategoryInputComponent } from './components/category-input/category-input.component';
import { FileUploaderComponent } from './components/reusable/file-uploader/file-uploader.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SideMenuComponent,
    ButtonComponent,
    FormInputComponent,
    CheckboxComponent,
    NotificationsComponent,
    NotificationComponent,
    ModalComponent,
    InputComponent,
    TranslatePipe,
    CategorySelectionComponent,
    CategoryInputComponent,
    FileUploaderComponent,
    SafeUrlPipe,
  ],
  exports: [
    SideMenuComponent,
    ButtonComponent,
    FormInputComponent,
    CheckboxComponent,
    NotificationsComponent,
    NotificationComponent,
    ModalComponent,
    InputComponent,
    TranslatePipe,
    CategorySelectionComponent,
    CategoryInputComponent,
    FileUploaderComponent,
    SafeUrlPipe,
  ]
})
export class SharedModule { }
