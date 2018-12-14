import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOverviewComponent } from './role-overview.component';

describe('RolesComponent', () => {
  let component: RoleOverviewComponent;
  let fixture: ComponentFixture<RoleOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
