import { PriceRequestsModule } from './price-requests.module';

describe('PriceRequestsModule', () => {
  let priceRequestsModule: PriceRequestsModule;

  beforeEach(() => {
    priceRequestsModule = new PriceRequestsModule();
  });

  it('should create an instance', () => {
    expect(priceRequestsModule).toBeTruthy();
  });
});
