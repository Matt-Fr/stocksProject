import { Component, signal } from '@angular/core';
import { CalculatorInputComponent } from '../../components/calculator-input/calculator-input.component';
import {
  calculatorInput,
  calculatorResult,
} from '../../models/CalculatorInput.model';
import { CalculatorResultTableComponent } from '../../components/calculator-result-table/calculator-result-table.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CalculatorInputComponent, CalculatorResultTableComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  calculatedData = signal<calculatorResult[] | undefined>(undefined);

  onCalculateResults(data: calculatorInput) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } =
      data;
    let investmentValue = initialInvestment;
    const annualData = [];
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    this.calculatedData.set(annualData);
    console.log(this.calculatedData());
  }
}
