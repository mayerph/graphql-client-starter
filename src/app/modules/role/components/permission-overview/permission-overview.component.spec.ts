import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionOverviewComponent } from './permission-overview.component';

describe('PermissionsComponent', () => {
  let component: PermissionOverviewComponent;
  let fixture: ComponentFixture<PermissionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
