import { TranslationsModule } from './translations.module';

describe('TranslationsModule', () => {
  let translationsModule: TranslationsModule;

  beforeEach(() => {
    translationsModule = new TranslationsModule();
  });

  it('should create an instance', () => {
    expect(translationsModule).toBeTruthy();
  });
});
