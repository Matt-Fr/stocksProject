import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private httpClient = inject(HttpClient);

  constructor() {}

  private getCurrentDateInUSEast(): string {
    const date = new Date();
    // Convert to US Eastern Time by adjusting the date to the desired timezone offset
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const usEastDate = date.toLocaleDateString('en-CA', options); // en-CA gives format YYYY-MM-DD
    return usEastDate;
  }

  loadStockData(ticker: string) {
    const endDate = this.getCurrentDateInUSEast();
    return this.httpClient.get<{ results: { c: number }[]; ticker: string }>(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-08-01/${endDate}?adjusted=true&sort=asc&apiKey=${environment.apiKeyPolygon}`
    );
  }
}
