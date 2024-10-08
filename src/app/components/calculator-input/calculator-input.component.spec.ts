import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorInputComponent } from './calculator-input.component';

describe('CalculatorInputComponent', () => {
  let component: CalculatorInputComponent;
  let fixture: ComponentFixture<CalculatorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
