import { Component, OnInit } from '@angular/core';
import {FullBanner} from '../../models/full-banner.model';
import {BannerDataService} from '../../services/banner-data.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-banners-home',
  templateUrl: './banners-home.component.html',
  styleUrls: ['./banners-home.component.scss']
})
export class BannersHomeComponent implements OnInit {

  public banners: Array<FullBanner> = [];
  public filtered: Array<FullBanner> = [];

  constructor(private bannerDataService: BannerDataService) { }

  ngOnInit() {
    this.bannerDataService
      .getBanners()
      .pipe(take(1))
      .subscribe(banners => {
        this.banners = banners;
        this.filtered = banners;
      });
  }

  public filter($event: Event): void {
    this.filtered = this.banners
      .filter(banner => banner._id.includes($event.target['value']));
  }
}
