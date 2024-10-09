import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ArticleNews, HomeNewsarticle } from '../../models/ArticleNews.model';
import { ThumbnailArticleComponent } from '../../components/thumbnail-article/thumbnail-article.component';
import { ButtonSaveLinkComponent } from '../../components/buttons/button-save-link/button-save-link.component';
import { CardModule } from 'primeng/card';
import { NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchBarComponent,
    ThumbnailArticleComponent,
    ButtonSaveLinkComponent,
    CardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  dataNews = signal<ArticleNews[]>([]);
  enteredText = signal<string>('');
  searchBarError = false;
  private router = inject(Router);
  private newsService = inject(NewsService);
  dataArticle = signal<ArticleNews[]>([]);

  tickers = [
    { ticker: 'AAPL', name: 'Apple' },
    { ticker: 'MSFT', name: 'Microsoft' },
    { ticker: 'GOOGL', name: 'Alphabet' },
    { ticker: 'AMZN', name: 'Amazon' },
    { ticker: 'NVDA', name: 'NVIDIA' },
    { ticker: 'TSLA', name: 'Tesla' },
    { ticker: 'META', name: 'Meta' },
    { ticker: 'BRK.B', name: 'Berkshire Hathaway' },
    { ticker: 'V', name: 'Visa' },
    { ticker: 'UNH', name: 'UnitedHealth' },
    { ticker: 'LLY', name: 'Eli Lilly' },
    { ticker: 'JNJ', name: 'Johnson & Johnson' },
    { ticker: 'JPM', name: 'JPMorgan Chase' },
    { ticker: 'XOM', name: 'Exxon Mobil' },
    { ticker: 'WMT', name: 'Walmart' },
    { ticker: 'MA', name: 'Mastercard' },
    { ticker: 'PG', name: 'Procter & Gamble' },
    { ticker: 'AVGO', name: 'Broadcom' },
    { ticker: 'ORCL', name: 'Oracle' },
    { ticker: 'KO', name: 'Coca-Cola' },
  ];

  ngOnInit(): void {
    this.fetchNewsArticle('SPY');
  }

  checkInput(data: string) {
    this.enteredText.set(data);
    console.log(this.enteredText());
    this.router.navigate([`/${this.enteredText()}`]);
  }

  fetchNewsArticle(ticker: string) {
    const subscription = this.newsService.fetchNewsArticle(ticker).subscribe({
      next: (resData) => {
        this.dataNews.set(resData.data);
        console.log(resData.data);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
