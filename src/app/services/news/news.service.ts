import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleNews } from '../../models/ArticleNews.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  fetchNewsArticle(ticker: string): Observable<{ data: ArticleNews[] }> {
    return this.httpClient.get<{ data: ArticleNews[] }>(
      `https://api.marketaux.com/v1/news/all?symbols=${ticker}&filter_entities=true&language=en&page=1&api_token=${environment.apiKeyTickerNews}`
    );
  }
}
