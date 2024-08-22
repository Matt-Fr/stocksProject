import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-thumbnail-article',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './thumbnail-article.component.html',
  styleUrl: './thumbnail-article.component.css',
})
export class ThumbnailArticleComponent {
  title = input<string>();
  url = input<string>();
  imageUrl = input<string>();
}
