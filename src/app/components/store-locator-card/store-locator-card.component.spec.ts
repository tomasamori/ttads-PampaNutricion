import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocatorCardComponent } from './store-locator-card.component';

describe('StoreLocatorCardComponent', () => {
  let component: StoreLocatorCardComponent;
  let fixture: ComponentFixture<StoreLocatorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLocatorCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreLocatorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
