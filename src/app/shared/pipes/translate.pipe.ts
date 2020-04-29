import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from '../../translations/services/translation.service';
import {Observable} from 'rxjs';
import {Language} from '../../core/models/language';
import {map, take} from 'rxjs/operators';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {}

  transform(key: string): Observable<string> {
    return this.translationService.translate(Language.en, key)
      .pipe(take(1), map(res => res ? res : key));
  }

}
