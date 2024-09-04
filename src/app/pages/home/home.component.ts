import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { HomeNewsarticle } from '../../models/ArticleNews.model';
import { ThumbnailArticleComponent } from '../../components/thumbnail-article/thumbnail-article.component';
import { ButtonSaveLinkComponent } from '../../components/buttons/button-save-link/button-save-link.component';
import { CardModule } from 'primeng/card';

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
  dataNews = signal<HomeNewsarticle[]>([]);
  enteredText = signal<string>('');
  searchBarError = false;
  constructor(private router: Router) {}

  tickers = [
    'AAPL',
    'MSFT',
    'GOOGL',
    'AMZN',
    'NVDA',
    'TSLA',
    'META',
    'BRK.B',
    'V',
    'UNH',
    'LLY',
    'JNJ',
    'JPM',
    'XOM',
    'WMT',
    'MA',
    'PG',
    'AVGO',
    'ORCL',
    'KO',
  ];

  ngOnInit(): void {
    this.fetchNews();
  }

  checkInput(data: string) {
    this.enteredText.set(data);
    console.log(this.enteredText());
    this.router.navigate([`/${this.enteredText()}`]);
  }

  fetchNews() {
    const subscription = this.httpClient
      .get<{ status: number; articles: HomeNewsarticle[] }>(
        `https://newsapi.org/v2/everything?q=finance&apiKey=${environment.apiKeyNews}`
      )
      .subscribe({
        next: (resData) => {
          console.log(resData);
          this.dataNews.set(resData.articles);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
