import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { ArticleNews } from '../../models/ArticleNews.model';
import { CardModule } from 'primeng/card';
import { ThumbnailArticleComponent } from '../thumbnail-article/thumbnail-article.component';

@Component({
  selector: 'app-news-container',
  standalone: true,
  imports: [CardModule, ThumbnailArticleComponent],
  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.css',
})
export class NewsContainerComponent {
  private newsService = inject(NewsService);
  private destroyRef = inject(DestroyRef);
  dataNews = signal<ArticleNews[]>([]);

  ticker = input('');

  ngOnInit(): void {
    this.fetchNewsArticle(this.ticker());
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
