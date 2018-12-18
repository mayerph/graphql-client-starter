import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailAddComponent } from './user-detail-add.component';

describe('UserDetailAddComponent', () => {
  let component: UserDetailAddComponent;
  let fixture: ComponentFixture<UserDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
