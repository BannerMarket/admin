import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerRowComponent } from './banner-row.component';

describe('BannerRowComponent', () => {
  let component: BannerRowComponent;
  let fixture: ComponentFixture<BannerRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
