import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-thumbnail-article',
  standalone: true,
  imports: [NgOptimizedImage, CardModule, ButtonModule],
  templateUrl: './thumbnail-article.component.html',
  styleUrl: './thumbnail-article.component.css',
})
export class ThumbnailArticleComponent {
  title = input<string>();
  url = input<string>();
  imageUrl = input<string>();
  description = input<string>();
}
