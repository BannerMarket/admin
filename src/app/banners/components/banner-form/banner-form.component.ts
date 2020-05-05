import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Urls} from '../../../../assets/configs/urls';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patterns} from '../../../core/utils/patterns';
import {Category} from '../../../categories/model/category.model';
import {FullBanner} from '../../models/full-banner.model';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {

  public readonly uploadUrl = Urls.BANNER_IMAGES;
  public readonly filesToAccept = 'image/*';

  @Input() isLoading = false;
  @Input() set initial(banner: FullBanner) {
    this.initialCategoryIds = banner.categories;
    this.bannerForm = this.getBannerFormGroup(banner);
  }
  @Output() banner: EventEmitter<FullBanner> = new EventEmitter<FullBanner>();

  public bannerForm: FormGroup;
  public isUploadingImages = false;
  public initialCategoryIds: Array<string> = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  public get imageUrls(): Array<string> {
    return this.bannerForm.controls['images'].value;
  }

  public saveBanner(): void {
    this.markAsDirty(this.bannerForm);

    if (this.bannerForm.invalid || this.isUploadingImages || this.isLoading) {
      return;
    }

    this.banner.emit(this.bannerForm.getRawValue());
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

  private getBannerFormGroup(banner: FullBanner): FormGroup {
    return this.formBuilder.group({
      lat: [banner.lat, [Validators.required, Validators.pattern(Patterns.DECIMAL)]],
      lng: [banner.lng, [Validators.required, Validators.pattern(Patterns.DECIMAL)]],
      categories: [banner.categories],
      titleGe: [banner.titleGe, [Validators.required]],
      titleEn: [banner.titleEn, [Validators.required]],
      shortDescriptionGe: [banner.shortDescriptionGe, [Validators.required]],
      shortDescriptionEn: [banner.shortDescriptionEn, [Validators.required]],
      fullDescriptionGe: [banner.fullDescriptionGe, [Validators.required]],
      fullDescriptionEn: [banner.fullDescriptionEn, [Validators.required]],
      images: [banner.images]
    });
  }
}
