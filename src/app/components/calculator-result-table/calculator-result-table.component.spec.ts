import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorResultTableComponent } from './calculator-result-table.component';

describe('CalculatorResultTableComponent', () => {
  let component: CalculatorResultTableComponent;
  let fixture: ComponentFixture<CalculatorResultTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorResultTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
