import {Component, OnInit, ViewChild} from '@angular/core';
import {Dictionaries, TranslationService} from './services/translation.service';
import {take} from 'rxjs/operators';
import {Utils} from '../core/utils/utils';
import {AddTranslationModalComponent} from './components/add-translation-modal/add-translation-modal.component';
import {FullTranslation} from './components/translation-row/translation-row.component';
import {NotificationsService} from '../shared/components/reusable/notifications/notifications.service';
import {AppNotification, AppNotificationType} from '../shared/components/reusable/notifications/models/notification.model';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {

  @ViewChild(AddTranslationModalComponent) modal?: AddTranslationModalComponent;

  public translations: Dictionaries;
  public keysToDisplay: Array<string> = [];

  constructor(private translationService: TranslationService,
              private notificationsService: NotificationsService) { }

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

  public openModal(): void {
    if (this.modal) {
      this.modal.open();
    }
  }

  public addNew(translation: FullTranslation): void {
    this.translationService.save(translation)
      .pipe(take(1))
      .subscribe(() => this.showSuccess(), error => this.showError(error));
  }

  private showSuccess(): void {
    this.notificationsService.pushNotification(
      new AppNotification(AppNotificationType.success, 'Translated successfully', {offerRefresh: true})
    );
  }

  private showError(error: any): void {
    console.error(error);
    this.notificationsService.pushNotification(new AppNotification(AppNotificationType.error, 'Could not translate'));
  }
}
