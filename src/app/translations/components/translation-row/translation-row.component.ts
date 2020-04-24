import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utils} from '../../../core/utils/utils';

export interface FullTranslation {
  key: string;
  en: string;
  ge: string;
}

@Component({
  selector: 'app-translation-row',
  templateUrl: './translation-row.component.html',
  styleUrls: ['./translation-row.component.scss']
})
export class TranslationRowComponent implements OnInit {

  @Input() key = '';
  @Input() en = '';
  @Input() ge = '';

  @Input() saveButtonLabel = 'Save';
  @Input() displayDelete = true;

  @Output() save: EventEmitter<FullTranslation> = new EventEmitter<FullTranslation>();
  @Output() delete: EventEmitter<FullTranslation> = new EventEmitter<FullTranslation>();

  constructor() { }

  ngOnInit() { }

  public onSave(): void {
    this.save.emit(this.fullTranslation);
  }

  public onDelete(): void {
    this.delete.emit(this.fullTranslation);
  }

  private get fullTranslation(): FullTranslation {
    return {key: Utils.safeStr(this.key), en: Utils.safeStr(this.en), ge: Utils.safeStr(this.ge)};
  }
}
