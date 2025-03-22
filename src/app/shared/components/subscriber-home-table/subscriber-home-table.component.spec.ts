import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberHomeTableComponent } from './subscriber-home-table.component';

describe('SubscriberHomeTableComponent', () => {
  let component: SubscriberHomeTableComponent;
  let fixture: ComponentFixture<SubscriberHomeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberHomeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberHomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
