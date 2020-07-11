import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedBannersComponent } from './promoted-banners.component';

describe('PromotedBannersComponent', () => {
  let component: PromotedBannersComponent;
  let fixture: ComponentFixture<PromotedBannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotedBannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
