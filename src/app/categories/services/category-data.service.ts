import { Injectable } from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Category} from '../model/category.model';
import {Observable} from 'rxjs';
import {Urls} from '../../../assets/configs/urls';
import {filter, map, shareReplay} from 'rxjs/operators';

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
    const onlyGroups = (categories: Array<Category>) => categories.filter(category => category.parentId === 'null');
    return this.getAllCategories()
      .pipe(map(onlyGroups));
  }

  public save(category: Category): Observable<any> {
    return this.dataService.post(`${Urls.CATEGORY}/${category._id}`, category);
  }

  public delete(category: Category): Observable<any> {
    return this.dataService.delete(`${Urls.CATEGORY}/${category._id}`);
  }
}
