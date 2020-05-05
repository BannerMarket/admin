import {Component, Input, OnInit} from '@angular/core';
import {Banner} from '../../models/full-banner.model';

@Component({
  selector: 'app-banner-row',
  templateUrl: './banner-row.component.html',
  styleUrls: ['./banner-row.component.scss']
})
export class BannerRowComponent implements OnInit {

  @Input() banner: Banner;

  constructor() { }

  ngOnInit() {
  }

}
