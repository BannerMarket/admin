import {Component, Input, OnInit} from '@angular/core';
import {FullBanner} from '../../models/full-banner.model';
import {BannerDataService} from '../../services/banner-data.service';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-banner-row',
  templateUrl: './banner-row.component.html',
  styleUrls: ['./banner-row.component.scss']
})
export class BannerRowComponent implements OnInit {

  @Input() banner: FullBanner;
  @Input() isHeader = false;

  public deleting = false;

  constructor(private bannerDataService: BannerDataService, private notificationsService: NotificationsService) { }

  ngOnInit() { }

  public deleteBanner(): void {
    if (this.deleting) {
      return;
    }

    this.deleting = true;
    this.bannerDataService.deleteBanner(this.banner._id)
      .pipe(take(1))
      .pipe(tap(console.log))
      .subscribe(
        () => this.showSuccess('Banner is deleted'),
        error => this.showError('Could not delete banner', error),
        () => this.deleting = false);
  }

  private showSuccess(message: string): void {
    this.notificationsService.notify(AppNotificationType.success, message, {offerRefresh: true});
  }

  private showError(message: string, error: any): void {
    console.error(error);
    this.notificationsService.notify(AppNotificationType.error, message);
  }
}
