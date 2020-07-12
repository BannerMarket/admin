import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../core/services/data.service';
import {Urls} from '../../../assets/configs/urls';
import {FullBanner} from '../models/full-banner.model';
import {Banner} from '../models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerDataService {

  constructor(private dataService: DataService) { }

  public getBanners(): Observable<Array<FullBanner>> {
    return this.dataService.get(Urls.BANNERS);
  }

  public getBanner(id: string): Observable<FullBanner> {
    return this.dataService.get(`${Urls.BANNER}/${id}`);
  }

  public createBanner(bannerData): Observable<FullBanner> {
    return this.dataService.post(Urls.BANNERS, bannerData);
  }

  public editBanner(id: string, banner: FullBanner): Observable<FullBanner> {
    return this.dataService.post(`${Urls.BANNER}/${id}`, banner);
  }

  public deleteBanner(id: string): Observable<any> {
    return this.dataService.delete(`${Urls.BANNER}/${id}`);
  }

  public deleteImages(imgNames: Array<string>, id: string): Observable<any> {
    return this.dataService.post(`${Urls.BANNER_REMOVE_IMAGES}/${id}`, {imgNames});
  }

  public getPromotedBanners(): Observable<Array<Banner>> {
    return this.dataService.get(Urls.PROMOTED_BANNERS);
  }

  public makePromoted(bannerId: string): Observable<any> {
    return this.dataService.post(Urls.PROMOTED_BANNERS, {bannerId});
  }

  public removePromoted(bannerId: string): Observable<any> {
    return this.dataService.delete(`${Urls.PROMOTED_BANNERS}/${bannerId}`);
  }
}
