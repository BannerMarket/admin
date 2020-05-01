import {Component, ElementRef, EventEmitter, forwardRef, HostListener, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {TreeNode} from '../../../core/models/tree.model';
import {Category} from '../../../categories/model/category.model';
import {CategoryDataService} from '../../../categories/services/category-data.service';
import {LanguageService} from '../../../core/services/language.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.component.html',
  styleUrls: ['./category-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryInputComponent),
      multi: true
    }
  ]
})
export class CategoryInputComponent implements OnInit {

  @Output() categories: EventEmitter<Array<Category>> = new EventEmitter();
  public focused = false;

  public _result = '';
  public _categories: Array<Category> = [];

  public groups: Array<TreeNode<Category>>;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.focused = this.eRef.nativeElement.contains(event.target);
  }

  constructor(private categoryService: CategoryDataService,
              private languageService: LanguageService,
              private eRef: ElementRef) {
  }

  ngOnInit(): void {
    this.categoryService.getGroupedCategories()
      .pipe(take(1))
      .subscribe(groups => {
        this.groups = groups;
      });
  }

  onSelection(categories: Array<Category>) {
    this._categories = categories;
    this.categories.emit(categories);

    const categoryNames = categories.map(category => category.name);

    this.languageService
      .translateArray(categoryNames)
      .pipe(take(1))
      .subscribe(translations => {
        this._result = translations.length > 0 ? translations.reduce((res, translation) => `${res}, ${translation}`) : '';
      });
  }
}
