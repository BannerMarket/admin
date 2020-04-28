import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddCategoryModalComponent} from './components/add-category-modal/add-category-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild(AddCategoryModalComponent) modal?: AddCategoryModalComponent;

  constructor() { }

  ngOnInit() {
  }

  public openModal(isGroup: boolean): void {
    if (this.modal) {
      this.modal.open(isGroup);
    }
  }
}
