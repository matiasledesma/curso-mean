import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPOComponent } from './spo.component';

describe('SPOComponent', () => {
  let component: SPOComponent;
  let fixture: ComponentFixture<SPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
