import {Category} from '../../categories/model/category.model';

export interface Banner {
  _id: string;
  lat: number;
  lng: number;
  directions: string;
  categories: Array<Category>;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: Array<string>;
}
