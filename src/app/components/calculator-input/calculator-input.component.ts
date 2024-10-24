import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculatorInput } from '../../models/CalculatorInput.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-calculator-input',
  standalone: true,
  imports: [FormsModule, InputNumberModule, ButtonModule, CardModule],
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
