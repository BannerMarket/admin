import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullBanner} from '../../models/full-banner.model';

@Component({
  selector: 'app-banner-row',
  templateUrl: './banner-row.component.html',
  styleUrls: ['./banner-row.component.scss']
})
export class BannerRowComponent implements OnInit {

  @Input() banner: FullBanner;
  @Input() isHeader = false;
  @Input() isPromoted = false;

  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() isPromotedClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  public deleting = false;

  constructor() { }

  ngOnInit() { }

  public onDelete(): void {
    this.delete.emit(this.banner._id);
  }

  public onToggle(): void {
    this.isPromotedClick.emit(!this.isPromoted);
  }
}
