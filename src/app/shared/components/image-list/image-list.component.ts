import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  @Input() imageUrls: Array<string>;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  public onDelete(url: string): void {
    this.delete.emit(url);
  }

}
