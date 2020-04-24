import { Injectable } from '@angular/core';
import {Observable, zip} from 'rxjs';
import {DataService} from '../../core/services/data.service';
import {Urls} from '../../../assets/configs/urls';
import {map, shareReplay} from 'rxjs/operators';

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
      const en$ = this.dataService.get(Urls.DICTIONARY, {language: 'en'});
      const ge$ = this.dataService.get(Urls.DICTIONARY, {language: 'ge'});

      this.dictionaries = zip(en$, ge$).pipe(
        map(([en, ge]) => ({en, ge})),
        shareReplay()
      );
    }

    return this.dictionaries;
  }
}
