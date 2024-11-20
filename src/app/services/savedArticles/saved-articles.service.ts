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
  private readonly localStorageKey = 'savedArticles';

  // Signal to store articles
  public savedArticles = signal<Article[]>(this.loadFromLocalStorage());

  /**
   * Load articles from local storage
   */
  private loadFromLocalStorage(): Article[] {
    const storedArticles = localStorage.getItem(this.localStorageKey);
    return storedArticles ? JSON.parse(storedArticles) : [];
  }

  /**
   * Save articles to local storage
   */
  private saveToLocalStorage(): void {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.savedArticles())
    );
  }

  /**
   * Add or update an article
   */
  addArticle(updatedArticle: Article): void {
    const currentArticles = this.savedArticles();

    // Check if the article is already in the array
    const isAlreadySaved = currentArticles.some(
      (article) => article.title === updatedArticle.title
    );

    if (!isAlreadySaved) {
      // Add the article if not already saved
      this.savedArticles.set([...currentArticles, updatedArticle]);
    } else {
      // Update the article if it already exists
      const updatedArticles = currentArticles.map((article) =>
        article.title === updatedArticle.title ? updatedArticle : article
      );
      this.savedArticles.set(updatedArticles);
    }

    // Persist to local storage
    this.saveToLocalStorage();
  }

  /**
   * Remove an article
   */
  removeArticle(articleToRemove: Article): void {
    const currentArticles = this.savedArticles();
    const updatedArticles = currentArticles.filter(
      (article) => article.title !== articleToRemove.title
    );
    this.savedArticles.set(updatedArticles);

    // Persist to local storage
    this.saveToLocalStorage();
  }
}
