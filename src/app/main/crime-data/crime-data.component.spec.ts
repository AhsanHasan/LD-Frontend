import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeDataComponent } from './crime-data.component';

describe('CrimeDataComponent', () => {
  let component: CrimeDataComponent;
  let fixture: ComponentFixture<CrimeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
