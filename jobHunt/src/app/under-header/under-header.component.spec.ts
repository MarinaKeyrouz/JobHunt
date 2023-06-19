import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderHeaderComponent } from './under-header.component';

describe('UnderHeaderComponent', () => {
  let component: UnderHeaderComponent;
  let fixture: ComponentFixture<UnderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
