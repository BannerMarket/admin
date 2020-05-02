import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../core/services/data.service';
import {Urls} from '../../../assets/configs/urls';
import {Banner} from '../models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerDataService {

  constructor(private dataService: DataService) { }

  public createBanner(bannerData): Observable<any> {
    return this.dataService.post(Urls.BANNERS, bannerData);
  }

  public getBanners(): Observable<Array<Banner>> {
    return this.dataService.get(Urls.BANNERS);
  }
}
