import { Component, OnInit } from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Observable} from 'rxjs';
import {PriceRequest} from './models/price-request';
import {Urls} from '../../assets/configs/urls';

@Component({
  selector: 'app-price-requests',
  templateUrl: './price-requests.component.html',
  styleUrls: ['./price-requests.component.scss']
})
export class PriceRequestsComponent implements OnInit {

  private requests: Observable<Array<PriceRequest>>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.requests = this.dataService.get(Urls.PRICE_REQUESTS);
  }

}
