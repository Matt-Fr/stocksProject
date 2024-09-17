import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StockInfoApiResponse } from '../../models/StockInfo.model';
import { GraphComponent } from '../../components/graph/graph.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ArticleNews, HomeNewsarticle } from '../../models/ArticleNews.model';
import { ThumbnailArticleComponent } from '../../components/thumbnail-article/thumbnail-article.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { StocksService } from '../../services/stocks/stocks.service';

type DateRange =
  | 'oneDay'
  | 'fiveDays'
  | 'oneMonth'
  | 'threeMonths'
  | 'sixMonths'
  | 'oneYear'
  | 'fiveYears';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    RouterLink,
    GraphComponent,
    SearchBarComponent,
    ThumbnailArticleComponent,
    TabMenuModule,
    CardModule,
  ],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
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
  dataXaxis: string[] = [];
  stocksService = inject(StocksService);
  duration = signal<DateRange>('threeMonths');
  dataArticle = signal<ArticleNews[]>([]);
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  private routeSub: Subscription | undefined;

  ngOnInit(): void {
    // Subscribe to route changes
    this.routeSub = this.route.params.subscribe((params) => {
      const ticker = params['ticker'];
      if (ticker) {
        this.fetchTickerInfo(ticker);
        this.fetchStockData(ticker, this.duration(), 'data1');
        this.fetchNewsArticle(ticker);
      } else {
        console.error('Ticker not found in the URL');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  fetchTickerInfo(ticker: string) {
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
  }

  onDurationChanged(range: DateRange) {
    this.updateDuration(range);
  }

  fetchStockData(ticker: string, range: DateRange, target: 'data1' | 'data2') {
    const subscription = this.stocksService
      .loadStockData(ticker, range)
      .subscribe({
        next: (resData) => {
          console.log(resData);

          const convertTimestampToDate = (timestamp: number): string => {
            const date = new Date(timestamp);
            // Format the date as needed, e.g., 'YYYY-MM-DD'
            return date.toISOString().split('T')[0];
          };

          if (target === 'data1') {
            this.data1 = resData.results.map((result) => result.c);
            this.nameTicker1 = resData.ticker;
          } else {
            this.data2 = resData.results.map((result) => result.c);
            this.nameTicker2 = resData.ticker;
          }

          this.dataXaxis = resData.results.map((result) =>
            convertTimestampToDate(result.t)
          );
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  submitInput(data: string) {
    this.enteredText.set(data);
    console.log(this.enteredText());

    if (data) {
      this.fetchStockData(data, this.duration(), 'data2');
    } else {
      console.error('Ticker not found in the searchbar');
    }
  }

  updateDuration(range: DateRange) {
    this.duration.set(range);
    const ticker = this.route.snapshot.paramMap.get('ticker');
    if (ticker) {
      this.fetchStockData(ticker, range, 'data1');
      if (this.enteredText()) {
        this.fetchStockData(this.enteredText(), range, 'data2');
      }
    }
  }
  // create an interface
  fetchNewsArticle(ticker: string) {
    const subscription = this.httpClient
      .get<{ data: ArticleNews[] }>(
        `https://api.marketaux.com/v1/news/all?symbols=${ticker}&filter_entities=true&language=en&page=1&api_token=${environment.apiKeyTickerNews}`
      )
      .subscribe({
        next: (resData) => {
          this.dataArticle.set(resData.data);
          console.log(this.dataArticle());
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
