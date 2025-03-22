import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberSearchComponent } from './subscriber-search.component';

describe('SubscriberSearchComponent', () => {
  let component: SubscriberSearchComponent;
  let fixture: ComponentFixture<SubscriberSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
