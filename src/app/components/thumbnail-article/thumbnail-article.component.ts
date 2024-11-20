import { Component, input, inject, signal, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SavedArticleService } from '../../services/savedArticles/saved-articles.service';
import { NgOptimizedImage } from '@angular/common';

interface Article {
  title: string | undefined;
  url: string | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
}

@Component({
  selector: 'app-thumbnail-article',
  standalone: true,
  imports: [CardModule, ButtonModule, NgOptimizedImage],
  templateUrl: './thumbnail-article.component.html',
  styleUrl: './thumbnail-article.component.css',
})
export class ThumbnailArticleComponent {
  title = input<string>();
  url = input<string>();
  imageUrl = input<string>();
  description = input<string>();

  private articleService = inject(SavedArticleService);

  // Computed property to check if the article is saved
  isSaved = computed(() => {
    const articleTitle = this.title();
    return this.articleService
      .savedArticles()
      .some((savedArticle) => savedArticle.title === articleTitle);
  });

  ngOnInit() {}

  handleSaveClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const article: Article = {
      title: this.title(),
      url: this.url(),
      imageUrl: this.imageUrl(),
      description: this.description(),
    };

    const isAlreadySaved = this.articleService
      .savedArticles()
      .some((savedArticle) => savedArticle.title === article.title);

    if (isAlreadySaved) {
      // Remove the article if it's already saved
      this.articleService.removeArticle(article);
      console.log(`Article removed: ${article.title}`);
    } else {
      // Add the article if it's not saved
      this.articleService.addArticle(article);
      console.log(`Article added: ${article.title}`);
    }

    // Log the updated list of saved articles
    console.log('Updated saved articles:', this.articleService.savedArticles());
  }
}
