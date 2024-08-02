import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StockInfoApiResponse } from '../../models/StockInfo.model';
import { GraphComponent } from '../../components/graph/graph.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { StocksService } from '../../services/stocks.service';
type DateRange = 'oneDay' | 'fiveDays' | 'oneMonth' | 'threeMonths';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [RouterLink, GraphComponent, SearchBarComponent],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  data: StockInfoApiResponse | null = null;
  enteredText = signal<string>('');

  data1: number[] = [];
  nameTicker1 = '';
  data2: number[] = [];
  nameTicker2 = '';
  dataXaxis: number[] = [];

  stocksService = inject(StocksService);
  duration = signal<DateRange>('threeMonths');

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
      const subscription = this.stocksService
        .loadStockData(ticker, this.duration())
        .subscribe({
          next: (resData) => {
            console.log(resData);

            this.data1 = resData.results.map((result) => result.c);

            this.nameTicker1 = resData.ticker;

            this.dataXaxis = resData.results.map((_, index) => index);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      console.error('Ticker not found in the URL');
    }
  }

  submitInput(data: string) {
    this.enteredText.set(data);
    console.log(this.enteredText());

    if (data) {
      const subscription = this.stocksService
        .loadStockData(data, this.duration())
        .subscribe({
          next: (resData) => {
            this.data2 = resData.results.map((result) => result.c);
            console.log(this.data2);
            this.nameTicker2 = resData.ticker;
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      console.error('Ticker not found in the searchbar');
    }
  }
}
