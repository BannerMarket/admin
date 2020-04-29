import { Injectable } from '@angular/core';
import {Observable, zip} from 'rxjs';
import {DataService} from '../../core/services/data.service';
import {Urls} from '../../../assets/configs/urls';
import {map, shareReplay} from 'rxjs/operators';
import {FullTranslation} from '../components/translation-row/translation-row.component';
import {Language} from '../../core/models/language';

export interface Dictionaries {
  en: object;
  ge: object;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private dictionaries: Observable<Dictionaries>;

  constructor(private dataService: DataService) { }

  public getDictionaries(): Observable<Dictionaries> {
    if (!this.dictionaries) {
      const en$ = this.dataService.get(Urls.DICTIONARY, {language: Language.en});
      const ge$ = this.dataService.get(Urls.DICTIONARY, {language: Language.ge});

      this.dictionaries = zip(en$, ge$).pipe(
        map(([en, ge]) => ({en, ge})),
        shareReplay()
      );
    }

    return this.dictionaries;
  }

  public save(fullTranslation: FullTranslation): Observable<any> {
    return this.dataService.put(`${Urls.TRANSLATION}/${fullTranslation.key}`, fullTranslation);
  }

  public delete(fullTranslation: FullTranslation): Observable<any> {
    return this.dataService.delete(`${Urls.TRANSLATION}/${fullTranslation.key}`);
  }

  public translate(language: Language, key: string): Observable<string | undefined> {
    return this.getDictionaries()
      .pipe(map(dictionaries => dictionaries[language][key]));
  }
}
