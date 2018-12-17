import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailProfileComponent } from './user-detail-profile.component';

describe('UserProfileComponent', () => {
  let component: UserDetailProfileComponent;
  let fixture: ComponentFixture<UserDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
