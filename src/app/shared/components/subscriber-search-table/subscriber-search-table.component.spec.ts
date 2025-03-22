import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberSearchTableComponent } from './subscriber-search-table.component';

describe('SubscriberSearchTableComponent', () => {
  let component: SubscriberSearchTableComponent;
  let fixture: ComponentFixture<SubscriberSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberSearchTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
