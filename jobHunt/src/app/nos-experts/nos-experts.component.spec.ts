import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosExpertsComponent } from './nos-experts.component';

describe('NosExpertsComponent', () => {
  let component: NosExpertsComponent;
  let fixture: ComponentFixture<NosExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosExpertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
