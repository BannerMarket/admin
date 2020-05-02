import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patterns} from '../../../core/utils/patterns';
import {Category} from '../../../categories/model/category.model';
import {Urls} from '../../../../assets/configs/urls';

@Component({
  selector: 'app-banners-edit',
  templateUrl: './banners-edit.component.html',
  styleUrls: ['./banners-edit.component.scss']
})
export class BannersEditComponent implements OnInit {

  public readonly uploadUrl = Urls.BANNER_IMAGES;
  public readonly filesToAccept = 'image/*';

  public bannerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bannerForm = this.formBuilder.group({
      lat: ['', [Validators.required, Validators.pattern(Patterns.DECIMAL)]],
      lng: ['', [Validators.required, Validators.pattern(Patterns.DECIMAL)]],
      categories: [[], [Validators.required]],
      titleGe: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      shortDescriptionGe: ['', [Validators.required]],
      shortDescriptionEn: ['', [Validators.required]],
      fullDescriptionGe: ['', [Validators.required]],
      fullDescriptionEn: ['', [Validators.required]],
      images: [[], [Validators.required]]
    });
  }

  public get imageUrls(): Array<string> {
    return this.bannerForm.controls['images'].value;
  }

  public saveBanner(): void {
    console.log(this.bannerForm.getRawValue());
  }

  public updateCategories(categories: Array<Category>): void {
    const categoryIds = categories.map(category => category._id);
    this.bannerForm.controls['categories'].patchValue(categoryIds);
  }

  public onAddImages(imageUrls: Array<string>): void {
    this.bannerForm.controls['images'].patchValue([...this.imageUrls, ...imageUrls]);
  }
}
