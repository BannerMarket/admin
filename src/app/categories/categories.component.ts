import {Component, OnInit, ViewChild} from '@angular/core';
import {AddCategoryModalComponent} from './components/add-category-modal/add-category-modal.component';
import {Category} from './model/category.model';
import {CategoryDataService} from './services/category-data.service';
import {NotificationsService} from '../shared/components/reusable/notifications/notifications.service';
import {take} from 'rxjs/operators';
import {AppNotification, AppNotificationType} from '../shared/components/reusable/notifications/models/notification.model';
import {SelectionOption} from '../shared/components/reusable/modal/selection-option.model';
import {TranslationService} from '../translations/services/translation.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild(AddCategoryModalComponent) modal?: AddCategoryModalComponent;

  public categoryGroups: Array<Category> = [];
  public groupOptions: Array<SelectionOption> = [];

  constructor(private categoryDataService: CategoryDataService,
              private notificationsService: NotificationsService,
              private translationService: TranslationService) { }

  ngOnInit() {
    this.categoryDataService.getCategoryGroups()
      .pipe(take(1))
      .subscribe(categoryGroups => {
        this.categoryGroups = categoryGroups;
        this.initGroupOptions(categoryGroups);
      });
  }

  public openModal(isGroup: boolean): void {
    if (this.modal) {
      this.modal.open(isGroup);
    }
  }

  public closeModal(): void {
    if (this.modal) {
      this.modal.close(null);
    }
  }

  public addCategory(category: Category): void {
    this.closeModal();
    this.categoryDataService.addNewCategory(category)
      .pipe(take(1))
      .subscribe(() => {
        this.showSuccess();
      }, error => { console.error(error); this.showError(); });
  }

  private showSuccess(): void {
    this.notificationsService.pushNotification(new AppNotification(
      AppNotificationType.success,
      'Category added',
      {offerRefresh: true}
    ));
  }

  private showError(): void {
    this.notificationsService.pushNotification(new AppNotification(
      AppNotificationType.error,
      'Could not add category'
    ));
  }

  private initGroupOptions(categoryGroups: Array<Category>): void {
    this.translationService.getDictionaries()
      .pipe(take(1))
      .subscribe(res => {
        const dictionary = res.en;
        this.groupOptions = this.getSelectionOptions(categoryGroups, dictionary);
      });
  }

  private getSelectionOptions(categoryGroups: Array<Category>, dictionary: object): Array<SelectionOption> {
    console.log(categoryGroups);

    return categoryGroups
      .map(categoryGroup => ({
        value: categoryGroup._id,
        name: dictionary[categoryGroup.name] ? dictionary[categoryGroup.name] : categoryGroup.name,
      }));
  }
}
