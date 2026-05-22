import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSearchTableComponent } from './public-search-table.component';

describe('SubscriberSearchTableComponent', () => {
  let component: PublicSearchTableComponent;
  let fixture: ComponentFixture<PublicSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSearchTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
