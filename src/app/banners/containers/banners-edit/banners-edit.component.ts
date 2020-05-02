import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patterns} from '../../../core/utils/patterns';
import {Category} from '../../../categories/model/category.model';
import {Urls} from '../../../../assets/configs/urls';
import {BannerDataService} from '../../services/banner-data.service';
import {take} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotification, AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';

@Component({
  selector: 'app-banners-edit',
  templateUrl: './banners-edit.component.html',
  styleUrls: ['./banners-edit.component.scss']
})
export class BannersEditComponent implements OnInit {

  public readonly uploadUrl = Urls.BANNER_IMAGES;
  public readonly filesToAccept = 'image/*';

  public bannerForm: FormGroup;
  public isUploadingImages = false;
  public isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private bannerDataService: BannerDataService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.bannerForm = this.formBuilder.group({
      lat: ['', [Validators.required, Validators.pattern(Patterns.DECIMAL)]],
      lng: ['', [Validators.required, Validators.pattern(Patterns.DECIMAL)]],
      categories: [[]],
      titleGe: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      shortDescriptionGe: ['', [Validators.required]],
      shortDescriptionEn: ['', [Validators.required]],
      fullDescriptionGe: ['', [Validators.required]],
      fullDescriptionEn: ['', [Validators.required]],
      images: [[]]
    });
  }

  public get imageUrls(): Array<string> {
    return this.bannerForm.controls['images'].value;
  }

  public saveBanner(): void {
    this.markAsDirty(this.bannerForm);

    if (this.bannerForm.invalid || this.isUploadingImages || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.bannerDataService
      .createBanner(this.bannerForm.getRawValue())
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess(),
          error => this.displayError(error),
        () => this.isLoading = false);
  }

  public updateCategories(categories: Array<Category>): void {
    const categoryIds = categories.map(category => category._id);
    this.bannerForm.controls['categories'].patchValue(categoryIds);
  }

  public onAddImages(imageUrls: Array<string>): void {
    this.bannerForm.controls['images'].patchValue([...this.imageUrls, ...imageUrls]);
  }

  private markAsDirty(bannerForm: FormGroup): void {
    Object.values(bannerForm.controls).forEach(control => control.markAsDirty());
  }

  private showSuccess(): void {
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.success, 'Banner updated'));
  }

  private displayError(error: any): void {
    console.error(error);
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.error, 'Could not update banner'));
  }
}
