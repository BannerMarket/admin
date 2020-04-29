import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Modal} from '../../../shared/models/modal.model';
import {ModalComponent} from '../../../shared/components/reusable/modal/modal.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/category.model';
import {SelectionOption} from '../../../shared/components/reusable/modal/selection-option.model';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements Modal, OnInit {

  @ViewChild(ModalComponent) modal?: ModalComponent;
  @Input() groupOptions: Array<SelectionOption> = [];
  @Output() add: EventEmitter<Category> = new EventEmitter<Category>();

  public title = '';
  public formGroup: FormGroup;
  public isGroup = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  public close($event: Event): void {
    if (this.modal) {
      this.modal.close($event);
    }
  }

  public open(isGroup: boolean): void {
    this.isGroup = isGroup;
    this.title = isGroup ? 'Add new category group' : 'Add new category';
    this.formGroup = this.getFormGroup(isGroup);
    if (this.modal) {
      this.modal.open();
    }
  }

  private getFormGroup(isGroup: boolean): FormGroup {
    if (isGroup) {
      return this.formBuilder.group({
        name: ['', [Validators.required]],
        sortOrder: ['', [Validators.required, Validators.pattern(new RegExp('^[0-9]+$'))]]
      });
    } else {
      return this.formBuilder.group({
        name: ['', [Validators.required]],
        sortOrder: ['', [Validators.required, Validators.pattern(new RegExp('^[0-9]+$'))]],
        parentId: ['', [Validators.required]],
      });
    }
  }

  public addNewCategory(): void {
    this.markAsDirty();

    if (this.formGroup.valid) {
      const data = this.formGroup.getRawValue();

      this.add.emit({
        ...data,
        sortOrder: Number(data.sortOrder)
      });
    }
  }

  private markAsDirty(): void {
    Object.values(this.formGroup.controls)
      .forEach(control => control.markAsDirty());
  }
}
