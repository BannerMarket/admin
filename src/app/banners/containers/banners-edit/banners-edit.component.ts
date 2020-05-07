import {Component, OnDestroy, OnInit} from '@angular/core';
import {BannerDataService} from '../../services/banner-data.service';
import {filter, map, pairwise, startWith, take} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotification, AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';
import {FullBanner, EmptyBanner} from '../../models/full-banner.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-banners-edit',
  templateUrl: './banners-edit.component.html',
  styleUrls: ['./banners-edit.component.scss']
})
export class BannersEditComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];

  public isAddingNew = false;
  public isLoading = false;
  public initialBanner: FullBanner;
  public id = '';

  constructor(private bannerDataService: BannerDataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.subscribeToBannerId();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private subscribeToBannerId(): void {
    const $bannerId: Observable<MSAudioRecvPayload> = this.activatedRoute.params
      .pipe(
        startWith({}),
        pairwise(),
        filter(([oldParams, newParams]) => oldParams['id'] !== newParams['id'] || newParams['id'] === undefined),
        map(([oldParams, newParams]) => newParams['id'] ? newParams['id'] : ''));

    const subscription = $bannerId.subscribe(id => {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.isAddingNew = !this.id;
      this.onIdChange();
    });

    this.subscriptions.push(subscription);
  }

  private onIdChange(): void {
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

  private addNew(banner: FullBanner): void {
    this.bannerDataService
      .createBanner(banner)
      .pipe(take(1))
      .subscribe(
        (response: FullBanner) => {
          this.showSuccess();
          this.goToNewBanner(response._id);
        },
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

  private goToNewBanner(id: string): void {
    this.router.navigateByUrl(`/banners/edit/${id}`).then(() => null);
  }

  public addImages(addedImageUrls: Array<string>): void {
    this.initialBanner.images = [...this.initialBanner.images, ...addedImageUrls];
  }

  public deleteImg(removedImgUrl: string): void {
    this.initialBanner.images = this.initialBanner.images.filter(imgUrl => imgUrl !== removedImgUrl);
  }

  private showSuccess(): void {
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.success, 'Banner updated'));
  }

  private displayError(error: any): void {
    console.error(error);
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.error, 'Could not update banner'));
  }
}
