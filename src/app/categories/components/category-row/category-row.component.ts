import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../model/category.model';
import {CategoryDataService} from '../../services/category-data.service';
import {take} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotification, AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';

@Component({
  selector: 'app-category-row',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.scss']
})
export class CategoryRowComponent implements OnInit {

  @Input() category: Category;
  @Input() header = false;

  public saving = false;
  public deleting = false;

  constructor(private categoryDataService: CategoryDataService,
              private notificationsService: NotificationsService) { }

  ngOnInit() { }

  public onSave(): void {
    if (this.saving || this.deleting) {
      return;
    }

    this.saving = true;
    this.categoryDataService.save(this.category)
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess('Category updated'),
          error => this.showError('Could not update category', error),
        () => this.saving = false);
  }

  public onDelete(): void {
    if (this.saving || this.deleting) {
      return;
    }

    this.deleting = true;
    this.categoryDataService.delete(this.category)
      .pipe(take(1))
      .subscribe(
        () => this.showSuccess('Category is deleted'),
          error => this.showError('Could not delete category', error),
        () => this.deleting = false);
  }

  private showSuccess(message: string): void {
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.success, message, {offerRefresh: true}));
  }

  private showError(message: string, error: any): void {
    console.error(error);
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.error, message));
  }
}
