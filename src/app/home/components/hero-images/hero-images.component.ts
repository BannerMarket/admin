import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationModalComponent} from '../../../shared/components/reusable/confrimation-modal/confirmation-modal.component';
import {Urls} from '../../../../assets/configs/urls';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';
import {DataService} from '../../../core/services/data.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-hero-images',
  templateUrl: './hero-images.component.html',
  styleUrls: ['./hero-images.component.scss']
})
export class HeroImagesComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent) modal: ConfirmationModalComponent;

  public readonly uploadUrl = Urls.HERO_IMAGES_UPLOAD;
  public readonly filesToAccept = 'image/*';
  public imageUrls: Array<string> = [];
  public images: Array<any> = [];

  constructor(private notificationsService: NotificationsService,
              private dataService: DataService) { }

  ngOnInit() {
    this.getImageUrls();
  }

  public onAddImages(): void {
    this.notificationsService.notify(AppNotificationType.success, 'Images added');
    this.getImageUrls();
  }

  public onDelete(imgUrl: string): void {
    if (this.modal) {
      const imgId = this.images.find(img => img.path === imgUrl);
      this.modal.open(() => {
        this.onConfirmedDelete(imgId);
      });
    }
  }

  private onConfirmedDelete(imgId: string): void {
    this.dataService.post(Urls.HERO_IMAGES_DELETE, {imgId})
      .pipe(take(1))
      .subscribe(() => {
          this.notificationsService.notify(AppNotificationType.success, 'Image removed');
          this.getImageUrls();
        },
        error => {
          console.error(error);
          this.notificationsService.notify(AppNotificationType.error, 'Could not remove image');
        });
  }

  private getImageUrls(): void {
    this.dataService.get(Urls.HERO_IMAGES)
      .pipe(take(1))
      .subscribe(images => {
        this.images = images;
        this.imageUrls = images.map(img => img.path);
      });
  }
}
