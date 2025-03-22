import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesHomeComponent } from './profiles-home.component';

describe('ProfilesHomeComponent', () => {
  let component: ProfilesHomeComponent;
  let fixture: ComponentFixture<ProfilesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesHomeComponent]
    });
    fixture = TestBed.createComponent(ProfilesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
