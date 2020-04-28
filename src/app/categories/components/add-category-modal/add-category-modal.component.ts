import {Component, OnInit, ViewChild} from '@angular/core';
import {Modal} from '../../../shared/models/modal.model';
import {ModalComponent} from '../../../shared/components/reusable/modal/modal.component';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements Modal, OnInit {

  @ViewChild(ModalComponent) modal?: ModalComponent;

  public title = '';

  constructor() { }

  ngOnInit() { }

  public close(): void {
    if (this.modal) {
      this.modal.close();
    }
  }

  public open(isGroup: boolean): void {
    this.title = isGroup ? 'Add new category group' : 'Add new category';
    if (this.modal) {
      this.modal.open();
    }
  }

}
