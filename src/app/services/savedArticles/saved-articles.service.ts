import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Article {
  title: string | undefined;
  url: string | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class SavedArticleService {
  private savedArticlesSubject = new BehaviorSubject<Article[]>([]);
  savedArticles$ = this.savedArticlesSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      this.savedArticlesSubject.next(JSON.parse(saved));
    }
  }

  saveArticle(article: Article): void {
    const currentArticles = this.savedArticlesSubject.getValue();
    if (!currentArticles.some((a) => a.url === article.url)) {
      const updatedArticles = [...currentArticles, article];
      this.savedArticlesSubject.next(updatedArticles);
      localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
    }
  }

  removeArticle(article: Article): void {
    const updatedArticles = this.savedArticlesSubject
      .getValue()
      .filter((a) => a.url !== article.url);
    this.savedArticlesSubject.next(updatedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
  }

  isArticleSaved(article: Article): boolean {
    return this.savedArticlesSubject
      .getValue()
      .some((a) => a.url === article.url);
  }
}
