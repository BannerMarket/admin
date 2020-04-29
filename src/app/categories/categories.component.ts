import {Component, OnInit, ViewChild} from '@angular/core';
import {AddCategoryModalComponent} from './components/add-category-modal/add-category-modal.component';
import {Category} from './model/category.model';
import {CategoryDataService} from './services/category-data.service';
import {NotificationsService} from '../shared/components/reusable/notifications/notifications.service';
import {take} from 'rxjs/operators';
import {AppNotification, AppNotificationType} from '../shared/components/reusable/notifications/models/notification.model';
import {SelectionOption} from '../shared/components/reusable/modal/selection-option.model';
import {TranslationService} from '../translations/services/translation.service';
import {FunctionalUtils} from '../core/utils/functional-utils';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild(AddCategoryModalComponent) modal?: AddCategoryModalComponent;

  public groupOptions: Array<SelectionOption> = [];
  public categories: Array<Category> = [];
  public filtered: Array<Category> = [];

  constructor(private categoryDataService: CategoryDataService,
              private notificationsService: NotificationsService,
              private translationService: TranslationService) { }

  ngOnInit() {
    this.categoryDataService.getCategoryGroups()
      .pipe(take(1))
      .subscribe(categoryGroups => {
        this.initGroupOptions(categoryGroups);
      });
    this.categoryDataService.getAllCategories()
      .pipe(take(1))
      .subscribe(categories => {
        this.categories = this.sortCategories(categories);
        this.filtered = this.categories;
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
    return categoryGroups
      .map(categoryGroup => ({
        value: categoryGroup._id,
        name: dictionary[categoryGroup.name] ? dictionary[categoryGroup.name] : categoryGroup.name,
      }));
  }

  private sortCategories(categories: Array<Category>): Array<Category> {
    const sortBySortOrder = (a: Category, b: Category) => a.sortOrder - b.sortOrder;
    const withSubcategories = (group: Category) => {
      const subcategories = categories
        .filter(_category => _category.parentId === group._id)
        .sort(sortBySortOrder);
      return [group, ...subcategories];
    };

    return categories
      .filter(this.isGroup)
      .sort(sortBySortOrder)
      .map(withSubcategories)
      .reduce(FunctionalUtils.flatten);
  }

  public isGroup(category: Category): boolean {
    return category.parentId === 'null';
  }

  public search(query: string): void {
    this.translationService.getDictionaries()
      .pipe(take(1))
      .subscribe(dictionary => {
        this.filtered = this.categories
          .filter(category => {
            const matchesId = category._id.includes(query);
            const matchesKey = category.name.includes(query);
            const matchesName = dictionary.en[category.name] && dictionary.en[category.name].includes(query);
            return matchesId || matchesKey || matchesName;
          });
      });
  }
}
