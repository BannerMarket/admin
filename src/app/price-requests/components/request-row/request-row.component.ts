import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PriceRequest} from '../../models/price-request';
import {DataService} from '../../../core/services/data.service';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {Urls} from '../../../../assets/configs/urls';
import {take} from 'rxjs/operators';
import {AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';

@Component({
  selector: 'app-request-row',
  templateUrl: './request-row.component.html',
  styleUrls: ['./request-row.component.scss']
})
export class RequestRowComponent implements OnInit {

  @Input() priceRequest: PriceRequest;
  @Input() isHeader: boolean;

  public deleting: boolean;

  constructor(private dataService: DataService, private notificationsService: NotificationsService) { }

  ngOnInit() { }

  public onDelete() {
    this.dataService
      .delete(`${Urls.PRICE_REQUESTS}/${this.priceRequest._id}`)
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess('Price request is deleted'),
        error => this.showError('Could not delete price request', error));
  }

  private showSuccess(message: string): void {
    this.notificationsService.notify(AppNotificationType.success, message, {offerRefresh: true});
  }

  private showError(message: string, error: any): void {
    console.error(error);
    this.notificationsService.notify(AppNotificationType.error, message);
  }
}
