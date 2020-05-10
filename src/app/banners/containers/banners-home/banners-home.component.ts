import {Component, OnInit, ViewChild} from '@angular/core';
import {FullBanner} from '../../models/full-banner.model';
import {BannerDataService} from '../../services/banner-data.service';
import {take} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';
import {ConfirmationModalComponent} from '../../../shared/components/reusable/confrimation-modal/confirmation-modal.component';

@Component({
  selector: 'app-banners-home',
  templateUrl: './banners-home.component.html',
  styleUrls: ['./banners-home.component.scss']
})
export class BannersHomeComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent) modal: ConfirmationModalComponent;

  public banners: Array<FullBanner> = [];
  public filtered: Array<FullBanner> = [];

  constructor(private bannerDataService: BannerDataService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.bannerDataService
      .getBanners()
      .pipe(take(1))
      .subscribe(banners => {
        this.banners = banners;
        this.filtered = banners;
      });
  }

  public filter($event: Event): void {
    this.filtered = this.banners
      .filter(banner => banner._id.includes($event.target['value']));
  }

  public onDelete(id: string): void {
    if (this.modal) {
      this.modal.open(() => {
        this.deleteBanner(id);
      });
    }
  }

  public deleteBanner(id: string): void {
    this.bannerDataService.deleteBanner(id)
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess('Banner is deleted'),
        error => this.showError('Could not delete banner', error));
  }

  private showSuccess(message: string): void {
    this.notificationsService.notify(AppNotificationType.success, message, {offerRefresh: true});
  }

  private showError(message: string, error: any): void {
    console.error(error);
    this.notificationsService.notify(AppNotificationType.error, message);
  }
}
