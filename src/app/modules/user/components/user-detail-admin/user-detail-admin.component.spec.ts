import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailAdminComponent } from './user-detail-admin.component';

describe('UserDetailAdminComponent', () => {
  let component: UserDetailAdminComponent;
  let fixture: ComponentFixture<UserDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
