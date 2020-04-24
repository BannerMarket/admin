import {Component, OnInit} from '@angular/core';
import {Dictionaries, TranslationService} from './services/translation.service';
import {take} from 'rxjs/operators';
import {Utils} from '../core/utils/utils';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {

  public translations: Dictionaries;
  public keysToDisplay: Array<string> = [];

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.translationService
      .getDictionaries()
      .pipe(take(1))
      .subscribe(translations => {
        this.translations = translations;
        this.keysToDisplay = this.search(this.translations, '');
      });
  }

  public onSearch($event: Event) {
    const query: string = $event.target['value'];
    this.keysToDisplay = this.search(this.translations, query);
  }

  private search(dictionaries: Dictionaries, query: string): Array<string> {
    const languageKeys: (lang: string) => Array<string> = lang => Object.keys(dictionaries[lang]);
    const keys: Array<string> = Utils.unique([...languageKeys('en'), ...languageKeys('ge')]);

    const keyWithQuery = keys.filter(key => key.includes(query));
    const enWordsWithQuery = keys.filter(key => dictionaries.en[key] && dictionaries.en[key].includes(query));
    const geWordsWithQuery = keys.filter(key => dictionaries.ge[key] && dictionaries.ge[key].includes(query));

    return Utils.unique([...keyWithQuery, ...enWordsWithQuery, ...geWordsWithQuery]);
  }
}
