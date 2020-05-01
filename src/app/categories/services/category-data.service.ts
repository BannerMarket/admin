import { Injectable } from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Category} from '../model/category.model';
import {Observable} from 'rxjs';
import {Urls} from '../../../assets/configs/urls';
import {map, shareReplay} from 'rxjs/operators';
import {Tree, TreeNode} from '../../core/models/tree.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  private allCategories: Observable<Array<Category>>;

  constructor(private dataService: DataService) {}

  public addNewCategory(category: Category): Observable<any> {
    return this.dataService.post(Urls.CATEGORIES, category);
  }

  public getAllCategories(): Observable<Array<Category>> {
    if (!this.allCategories) {
      this.allCategories = this.dataService.get(Urls.CATEGORIES)
        .pipe(shareReplay());
    }

    return this.allCategories;
  }

  public getCategoryGroups(): Observable<Array<Category>> {
    const onlyGroups = (categories: Array<Category>) => categories.filter(this.isGroup);
    return this.getAllCategories()
      .pipe(map(onlyGroups));
  }

  public getGroupedCategories(): Observable<Tree<Category>> {
    return this.getAllCategories().pipe(map(categories => {
      const groups = categories
        .filter(this.isGroup)
        .sort(this.sortBySortOrder);

      return groups
        .map(this.categoriesOfGroup(categories));
    }));
  }

  public isGroup(category: Category): boolean {
    return category && category.parentId === 'null';
  }

  public save(category: Category): Observable<any> {
    return this.dataService.post(`${Urls.CATEGORY}/${category._id}`, category);
  }

  public delete(category: Category): Observable<any> {
    return this.dataService.delete(`${Urls.CATEGORY}/${category._id}`);
  }

  private sortBySortOrder(a: Category, b: Category): number {
    return a.sortOrder - b.sortOrder;
  }

  private categoriesOfGroup(categories: Array<Category>): (group: Category) => TreeNode<Category> {
    return (group: Category) => {
      const children = categories
        .filter(category => category.parentId === group._id)
        .map(category => ({data: category, children: []}));
      return {
        data: group,
        children
      };
    };
  }
}
