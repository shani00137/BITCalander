import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecentersComponent } from './managecenters.component';

describe('ManagecentersComponent', () => {
  let component: ManagecentersComponent;
  let fixture: ComponentFixture<ManagecentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecentersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
