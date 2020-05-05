import { Component, OnInit } from '@angular/core';
import {BannerDataService} from '../../services/banner-data.service';
import {take} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotification, AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';
import {FullBanner, EmptyBanner} from '../../models/full-banner.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-banners-edit',
  templateUrl: './banners-edit.component.html',
  styleUrls: ['./banners-edit.component.scss']
})
export class BannersEditComponent implements OnInit {

  public isAddingNew = false;
  public isLoading = false;
  public initialBanner: FullBanner;
  public id = '';

  constructor(private bannerDataService: BannerDataService,
              private activatedRoute: ActivatedRoute,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.isAddingNew = !this.id;

    if (this.isAddingNew) {
      this.initialBanner = EmptyBanner;
    } else {
      this.bannerDataService
        .getBanner(this.id)
        .pipe(take(1))
        .subscribe(banner => {
          this.initialBanner = banner;
        });
    }
  }

  public saveBanner(banner: FullBanner): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    if (this.isAddingNew) {
      this.addNew(banner);
    } else {
      this.editOld(this.id, banner);
    }
  }

  private showSuccess(): void {
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.success, 'Banner updated'));
  }

  private displayError(error: any): void {
    console.error(error);
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.error, 'Could not update banner'));
  }

  private addNew(banner: FullBanner): void {
    this.bannerDataService
      .createBanner(banner)
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess(),
        error => this.displayError(error),
        () => this.isLoading = false);
  }

  private editOld(id: string, banner: FullBanner) {
    this.bannerDataService
      .editBanner(id, banner)
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess(),
        error => this.displayError(error),
        () => this.isLoading = false);
  }
}
