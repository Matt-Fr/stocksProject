import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculatorInput } from '../../models/CalculatorInput.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-calculator-input',
  standalone: true,
  providers: [MessageService],

  imports: [
    FormsModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    ToastModule,
  ],
  templateUrl: './calculator-input.component.html',
  styleUrl: './calculator-input.component.css',
})
export class CalculatorInputComponent {
  private messageService = inject(MessageService);
  calculateEvent = output<calculatorInput>();

  inputInitialInvestment = signal(0);
  inputAnnualInvestment = signal(0);
  inputExpectedReturn = signal(5);
  inputDuration = signal(10);

  show() {
    this.messageService.add({
      severity: 'error',
      summary: 'No input',
      detail:
        'Please enter a value for Annual Investment or Initial Investment.',
    });
  }

  onSubmit() {
    if (
      this.inputInitialInvestment() <= 0 &&
      this.inputAnnualInvestment() <= 0
    ) {
      this.show();
      return;
    }

    this.calculateEvent.emit({
      initialInvestment: this.inputInitialInvestment(),
      duration: this.inputDuration(),
      expectedReturn: this.inputExpectedReturn(),
      annualInvestment: this.inputAnnualInvestment(),
    });
  }
}
