import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRequestsComponent } from './price-requests.component';

describe('PriceRequestsComponent', () => {
  let component: PriceRequestsComponent;
  let fixture: ComponentFixture<PriceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
