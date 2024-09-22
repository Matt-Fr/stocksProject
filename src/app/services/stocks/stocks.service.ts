import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

type DateRange =
  | 'oneDay'
  | 'fiveDays'
  | 'oneMonth'
  | 'threeMonths'
  | 'sixMonths'
  | 'oneYear'
  | 'fiveYears';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private httpClient = inject(HttpClient);

  private apiKeys = [environment.apiKeyPolygon, environment.apiKeyPolygon2];
  private currentApiKeyIndex = 0;

  private getApiKey(): string {
    return this.apiKeys[this.currentApiKeyIndex];
  }

  // switch api key
  private rotateApiKey() {
    this.currentApiKeyIndex =
      (this.currentApiKeyIndex + 1) % this.apiKeys.length;
  }

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
        return `range/1/hour/${this.getDateDaysBeforeInUSEast(1)}/${endDate}`;
      case 'fiveDays':
        return `range/1/hour/${this.getDateDaysBeforeInUSEast(5)}/${endDate}`;
      case 'oneMonth':
        return `range/1/day/${this.getDateDaysBeforeInUSEast(30)}/${endDate}`;
      case 'threeMonths':
        return `range/1/day/${this.getDateDaysBeforeInUSEast(90)}/${endDate}`;
      case 'sixMonths':
        return `range/1/day/${this.getDateDaysBeforeInUSEast(180)}/${endDate}`;
      case 'oneYear':
        return `range/1/day/${this.getDateDaysBeforeInUSEast(365)}/${endDate}`;
      case 'fiveYears':
        return `range/1/week/${this.getDateDaysBeforeInUSEast(
          1825
        )}/${endDate}`;
      default:
        throw new Error('Invalid date range');
    }
  }

  loadStockData(
    ticker: string,
    range: DateRange,
    retryCount: number = 0
  ): Observable<{ results: { c: number; t: number }[]; ticker: string }> {
    const endDate = this.getCurrentDateInUSEast();
    const rangeString = this.getRangeString(range, endDate);

    return this.httpClient
      .get<{
        results: { c: number; t: number }[];
        ticker: string;
      }>(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/${rangeString}?adjusted=true&sort=asc&apiKey=${this.getApiKey()}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 429 && retryCount < this.apiKeys.length) {
            // Rotate the API key if rate limit is hit
            this.rotateApiKey();
            // Retry the request with the new API key
            return this.loadStockData(ticker, range, retryCount + 1);
          } else {
            // Re-throw any other error or stop retrying if all API keys have been tried
            return throwError(
              () =>
                new Error(
                  `Failed after ${retryCount} retries: ${error.message}`
                )
            );
          }
        })
      );
  }
}
