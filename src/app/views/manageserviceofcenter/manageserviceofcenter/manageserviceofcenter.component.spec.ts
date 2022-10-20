import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageserviceofcenterComponent } from './manageserviceofcenter.component';

describe('ManageserviceofcenterComponent', () => {
  let component: ManageserviceofcenterComponent;
  let fixture: ComponentFixture<ManageserviceofcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageserviceofcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageserviceofcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
