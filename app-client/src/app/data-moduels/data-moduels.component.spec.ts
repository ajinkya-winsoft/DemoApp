import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModuelsComponent } from './data-moduels.component';

describe('DataModuelsComponent', () => {
  let component: DataModuelsComponent;
  let fixture: ComponentFixture<DataModuelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataModuelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModuelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
