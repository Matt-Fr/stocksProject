import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ArticleNews } from '../../models/ArticleNews.model';
import { ThumbnailArticleComponent } from '../../components/thumbnail-article/thumbnail-article.component';
import { ButtonSaveLinkComponent } from '../../components/buttons/button-save-link/button-save-link.component';
import { CardModule } from 'primeng/card';
import { NewsService } from '../../services/news/news.service';
import { NewsContainerComponent } from '../../components/news-container/news-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchBarComponent,
    ThumbnailArticleComponent,
    ButtonSaveLinkComponent,
    CardModule,
    NewsContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dataNews = signal<ArticleNews[]>([]);
  enteredText = signal<string>('');
  searchBarError = false;
  private router = inject(Router);
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

  checkInput(data: string) {
    this.enteredText.set(data);
    this.router.navigate([`/ticker/${this.enteredText()}`]);
  }
}
