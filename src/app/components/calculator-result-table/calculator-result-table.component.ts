import { Component, input } from '@angular/core';
import { calculatorResult } from '../../models/CalculatorInput.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-calculator-result-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './calculator-result-table.component.html',
  styleUrl: './calculator-result-table.component.css',
})
export class CalculatorResultTableComponent {
  calculatedDataInput = input<calculatorResult[] | undefined>();
}
