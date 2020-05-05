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

  public isLoading = false;
  public initialBanner: FullBanner;

  constructor(private bannerDataService: BannerDataService,
              private activatedRoute: ActivatedRoute,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.bannerDataService
        .getBanner(id)
        .pipe(take(1))
        .subscribe(banner => {
          this.initialBanner = banner;
        });
    } else {
      this.initialBanner = EmptyBanner;
    }
  }

  public saveBanner(banner: FullBanner): void {
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
