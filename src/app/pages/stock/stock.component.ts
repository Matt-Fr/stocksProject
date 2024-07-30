import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StockInfoApiResponse } from '../../models/StockInfo.model';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  data: StockInfoApiResponse | null = null;
  pic: string = '';

  ngOnInit(): void {
    const ticker = this.route.snapshot.paramMap.get('ticker');

    if (ticker) {
      const subscription = this.httpClient
        .get<StockInfoApiResponse>(
          `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${environment.apiKeyPolygon}`
        )
        .subscribe({
          next: (resData) => {
            console.log(resData);
            this.data = resData;
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      console.error('Ticker not found in the URL');
    }

    if (ticker) {
      const subscription = this.httpClient
        .get<StockInfoApiResponse>(
          `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/month/2023-01-09/2024-02-10?adjusted=true&sort=asc&apiKey=${environment.apiKeyPolygon}`
        )
        .subscribe({
          next: (resData) => {
            console.log(resData);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      console.error('Ticker not found in the URL');
    }
  }
}
