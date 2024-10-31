import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DateRange, StockInfoApiResponse } from '../../models/StockInfo.model';
import { GraphComponent } from '../../components/graph/graph.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ArticleNews } from '../../models/ArticleNews.model';
import { ThumbnailArticleComponent } from '../../components/thumbnail-article/thumbnail-article.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { StocksService } from '../../services/stocks/stocks.service';
import { NewsService } from '../../services/news/news.service';
import { PanelModule } from 'primeng/panel';
import { ButtonSaveLinkComponent } from '../../components/buttons/button-save-link/button-save-link.component';

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
    PanelModule,
    ButtonSaveLinkComponent,
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
  private newsService = inject(NewsService);
  tickerName = signal('');
  errorMessage = '';

  ngOnInit(): void {
    // Subscribe to route changes
    this.routeSub = this.route.params.subscribe((params) => {
      const ticker = params['ticker'];
      if (ticker) {
        this.tickerName.set(ticker);
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

  loading: boolean = false;
  tickerNotFoundError: boolean = false;

  fetchTickerInfo(ticker: string) {
    this.loading = true;
    this.tickerNotFoundError = false;

    const subscription = this.stocksService.fetchTickerInfo(ticker).subscribe({
      next: (resData) => {
        this.data = resData;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.data = null;
        console.error('Error object:', error);

        const errorMessage = error.message || ''; // Extract message from error

        // Check for specific status in the error message string
        if (errorMessage.includes('429')) {
          this.errorMessage =
            'Too many requests. Please wait one minute before refreshing.';
        } else if (errorMessage.includes('404')) {
          this.errorMessage = `We're sorry, but the ticker ${this.tickerName()} couldn't be located.`;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      },
      complete: () => {
        this.loading = false;
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
    // console.log(this.enteredText());

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

  fetchNewsArticle(ticker: string) {
    const subscription = this.newsService.fetchNewsArticle(ticker).subscribe({
      next: (resData) => {
        this.dataArticle.set(resData.data);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
