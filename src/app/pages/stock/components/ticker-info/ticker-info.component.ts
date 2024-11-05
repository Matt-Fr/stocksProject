import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

export interface TickerData {
  results: {
    name: string;
    ticker: string;
    market: string;
    description: string;
    homepage_url: string;
  };
}

@Component({
  selector: 'app-ticker-info',
  standalone: true,
  imports: [CardModule],
  templateUrl: './ticker-info.component.html',
  styleUrl: './ticker-info.component.css',
})
export class TickerInfoComponent {
  data = input.required<TickerData>();
}
