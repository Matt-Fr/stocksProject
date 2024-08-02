import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

type DateRange = 'oneDay' | 'fiveDays' | 'oneMonth' | 'threeMonths';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private httpClient = inject(HttpClient);

  constructor() {}

  private getCurrentDateInUSEast(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('en-CA', options); // en-CA gives format YYYY-MM-DD
  }

  private getDateDaysBeforeInUSEast(daysBefore: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysBefore);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('en-CA', options);
  }

  private getRangeString(range: DateRange, endDate: string): string {
    switch (range) {
      case 'oneDay':
        return `range/1/minute/${this.getDateDaysBeforeInUSEast(1)}/${endDate}`;
      case 'fiveDays':
        return `range/1/hour/${this.getDateDaysBeforeInUSEast(5)}/${endDate}`;
      case 'oneMonth':
        return `range/1/day/${this.getDateDaysBeforeInUSEast(30)}/${endDate}`;
      case 'threeMonths':
        return `range/1/week/${this.getDateDaysBeforeInUSEast(90)}/${endDate}`;
      default:
        throw new Error('Invalid date range');
    }
  }

  loadStockData(ticker: string, range: DateRange) {
    const endDate = this.getCurrentDateInUSEast();
    const rangeString = this.getRangeString(range, endDate);

    return this.httpClient.get<{ results: { c: number }[]; ticker: string }>(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/${rangeString}?adjusted=true&sort=asc&apiKey=${environment.apiKeyPolygon}`
    );
  }
}
