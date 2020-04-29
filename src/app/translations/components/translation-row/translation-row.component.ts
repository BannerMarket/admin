import {Component, Input, OnInit} from '@angular/core';
import {Utils} from '../../../core/utils/utils';
import {TranslationService} from '../../services/translation.service';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {take} from 'rxjs/operators';
import {AppNotification, AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';

export interface FullTranslation {
  key: string;
  en: string;
  ge: string;
}

@Component({
  selector: 'app-translation-row',
  templateUrl: './translation-row.component.html',
  styleUrls: ['./translation-row.component.scss']
})
export class TranslationRowComponent implements OnInit {

  @Input() key = '';
  @Input() en = '';
  @Input() ge = '';

  @Input() saveButtonLabel = 'Save';
  @Input() header = false;

  public saving = false;
  public deleting = false;

  constructor(private translationService: TranslationService, private notificationsService: NotificationsService) { }

  ngOnInit() { }

  public onSave(): void {
    if (this.saving || this.deleting) {
      return;
    }

    this.saving = true;
    this.translationService
      .save(this.fullTranslation)
      .pipe(take(1))
      .subscribe(() => {
        this.saving = false;
        this.notifySuccess('Translation updated successfully');
      }, error => {
        this.saving = false;
        console.error(error);
        this.notifyError('Error when updating translation');
      });
  }

  public onDelete(): void {
    if (this.saving || this.deleting) {
      return;
    }

    this.deleting = true;
    this.translationService
      .delete(this.fullTranslation)
      .pipe(take(1))
      .subscribe(() => {
        this.deleting = false;
        this.notifySuccess('Translation removed successfully');
      }, error => {
        this.deleting = false;
        console.error(error);
        this.notifyError('Error when removing translation');
      });
  }

  private get fullTranslation(): FullTranslation {
    return {key: Utils.safeStr(this.key), en: Utils.safeStr(this.en), ge: Utils.safeStr(this.ge)};
  }

  private notifySuccess(message: string): void {
    this.notificationsService
      .pushNotification(new AppNotification(AppNotificationType.success, message, {offerRefresh: true}));
  }

  private notifyError(message: string): void {
    this.notificationsService
      .pushNotification(new AppNotification(AppNotificationType.error, message));
  }
}
