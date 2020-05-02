import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../core/services/data.service';
import {Urls} from '../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class BannerDataService {

  constructor(private dataService: DataService) { }

  public createBanner(bannerData): Observable<any> {
    return this.dataService.post(Urls.BANNERS, bannerData);
  }
}
