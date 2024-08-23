import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculatorInput } from '../../models/CalculatorInput.model';

@Component({
  selector: 'app-calculator-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator-input.component.html',
  styleUrl: './calculator-input.component.css',
})
export class CalculatorInputComponent {
  calculateEvent = output<calculatorInput>();

  inputInitialInvestment = signal(0);
  inputAnnualInvestment = signal(0);
  inputExpectedReturn = signal(5);
  inputDuration = signal(10);

  onSubmit() {
    this.calculateEvent.emit({
      initialInvestment: this.inputInitialInvestment(),
      duration: this.inputDuration(),
      expectedReturn: this.inputExpectedReturn(),
      annualInvestment: this.inputAnnualInvestment(),
    });
  }
}
