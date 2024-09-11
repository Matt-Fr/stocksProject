import { Injectable, signal } from '@angular/core';

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
  savedArticles = signal<Article[]>([]);

  constructor() {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      this.savedArticles.set(JSON.parse(saved));
    }
  }

  saveArticle(article: Article): void {
    const currentArticles = this.savedArticles();
    if (!currentArticles.some((a) => a.url === article.url)) {
      this.savedArticles.set([...currentArticles, article]);
      localStorage.setItem(
        'savedArticles',
        JSON.stringify(this.savedArticles())
      );
    }
  }

  removeArticle(article: Article): void {
    const updatedArticles = this.savedArticles().filter(
      (a) => a.url !== article.url
    );
    this.savedArticles.set(updatedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
  }

  isArticleSaved(article: Article): boolean {
    return this.savedArticles().some((a) => a.url === article.url);
  }
}
