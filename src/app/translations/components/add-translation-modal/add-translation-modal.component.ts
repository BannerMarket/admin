import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Modal} from '../../../shared/models/modal.model';
import {ModalComponent} from '../../../shared/components/reusable/modal/modal.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FullTranslation} from '../translation-row/translation-row.component';

@Component({
  selector: 'app-add-translation-modal',
  templateUrl: './add-translation-modal.component.html',
  styleUrls: ['./add-translation-modal.component.scss']
})
export class AddTranslationModalComponent implements Modal, OnInit {

  @ViewChild(ModalComponent) modal?: ModalComponent;
  @Output() add: EventEmitter<FullTranslation> = new EventEmitter<FullTranslation>();

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  public close($event: Event): void {
    if (this.modal) {
      this.modal.close($event);
    }
  }

  public open(): void {
    this.formGroup = this.formBuilder.group({
      key: ['', [Validators.required]],
      en: ['', [Validators.required]],
      ge: ['', [Validators.required]]
    });

    if (this.modal) {
      this.modal.open();
    }
  }

  private markAsDirty(): void {
    Object.values(this.formGroup.controls)
      .forEach(control => control.markAsDirty());
  }

  public addNewTranslation(): void {
    this.markAsDirty();

    if (this.formGroup.valid) {
      this.add.emit(this.formGroup.getRawValue());
      this.close(null);
    }
  }
}
