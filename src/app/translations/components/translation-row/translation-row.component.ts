import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
  @Output() save: EventEmitter<FullTranslation> = new EventEmitter<FullTranslation>();
  @Output() delete: EventEmitter<FullTranslation> = new EventEmitter<FullTranslation>();

  constructor() { }

  ngOnInit() {
  }

}
