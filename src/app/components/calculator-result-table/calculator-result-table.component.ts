import { Component, Input, input, signal } from '@angular/core';
import { calculatorResult } from '../../models/CalculatorInput.model';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-calculator-result-table',
  standalone: true,
  imports: [CurrencyPipe, TableModule],
  templateUrl: './calculator-result-table.component.html',
  styleUrl: './calculator-result-table.component.css',
})
export class CalculatorResultTableComponent {
  // @Input() calculatedDataInput: calculatorResult[] | undefined;

  calculatedDataInput = input<calculatorResult[]>();
}
