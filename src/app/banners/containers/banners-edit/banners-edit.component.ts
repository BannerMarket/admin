import { Component, OnInit } from '@angular/core';
import {BannerDataService} from '../../services/banner-data.service';
import {take} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotification, AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';
import {Banner, EmptyBanner} from '../../models/banner.model';

@Component({
  selector: 'app-banners-edit',
  templateUrl: './banners-edit.component.html',
  styleUrls: ['./banners-edit.component.scss']
})
export class BannersEditComponent implements OnInit {

  public isLoading = false;
  public initialBanner: Banner;

  constructor(private bannerDataService: BannerDataService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.initialBanner = EmptyBanner;
  }

  public saveBanner(banner: Banner): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.bannerDataService
      .createBanner(banner)
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess(),
          error => this.displayError(error),
        () => this.isLoading = false);
  }

  private showSuccess(): void {
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.success, 'Banner updated'));
  }

  private displayError(error: any): void {
    console.error(error);
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.error, 'Could not update banner'));
  }
}
