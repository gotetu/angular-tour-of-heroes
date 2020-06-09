import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSaerchComponent } from './hero-saerch.component';

describe('HeroSaerchComponent', () => {
  let component: HeroSaerchComponent;
  let fixture: ComponentFixture<HeroSaerchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSaerchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSaerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
