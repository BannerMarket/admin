import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmationModalComponent} from '../../../shared/components/reusable/confrimation-modal/confirmation-modal.component';
import {Urls} from '../../../../assets/configs/urls';
import {BannerDataService} from '../../services/banner-data.service';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {Utils} from '../../../core/utils/utils';
import {take} from 'rxjs/operators';
import {AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';

@Component({
  selector: 'app-banner-images',
  templateUrl: './banner-images.component.html',
  styleUrls: ['./banner-images.component.scss']
})
export class BannerImagesComponent implements OnInit {

  @Input() imageUrls: Array<string> = [];
  @Input() bannerId: string;

  @ViewChild(ConfirmationModalComponent) modal: ConfirmationModalComponent;
  @Output() deleteImg: EventEmitter<string> = new EventEmitter<string>();
  @Output() imagesAdded: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  public readonly uploadUrl = Urls.BANNER_IMAGES;
  public readonly filesToAccept = 'image/*';

  constructor(private bannerDataService: BannerDataService, private notificationsService: NotificationsService) { }

  ngOnInit() { }

  public onAddImages(imageUrls: Array<string>): void {
    this.notificationsService.notify(AppNotificationType.success, 'Images added');
    this.imagesAdded.emit(imageUrls);
  }

  public onDelete(imgUrl: string): void {
    if (this.modal) {
      this.modal.open(() => {
        this.onConfirmedDelete(imgUrl);
      });
    }
  }

  private onConfirmedDelete(imgUrl: string): void {
    const imgName = Utils.getFileName(imgUrl);

    this.bannerDataService.deleteImages([imgName], this.bannerId)
      .pipe(take(1))
      .subscribe(() => {
          this.notificationsService.notify(AppNotificationType.success, 'Image removed');
          this.deleteImg.emit(imgUrl);
        },
        error => {
          console.error(error);
          this.notificationsService.notify(AppNotificationType.error, 'Could not remove image');
        });
  }
}
