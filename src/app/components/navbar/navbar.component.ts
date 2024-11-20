import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { FavoriteTickersService } from '../../services/favoriteTickers/favorite-tickers.service';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { SavedArticleService } from '../../services/savedArticles/saved-articles.service';
import { ThumbnailArticleComponent } from '../thumbnail-article/thumbnail-article.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, SidebarModule, ThumbnailArticleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private favoriteTickersService = inject(FavoriteTickersService);
  private articleService = inject(SavedArticleService); // Inject the ArticleService

  items: MenuItem[] = [];
  private favoriteSubscription!: Subscription;

  sidebarVisible: boolean = false;
  savedArticles = this.articleService.savedArticles;

  ngOnInit() {
    // Subscribe to favorite tickers updates
    this.favoriteSubscription =
      this.favoriteTickersService.favoriteTickers$.subscribe(() => {
        this.updateMenuItems();
      });

    this.updateMenuItems();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  updateMenuItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        },
      },
      {
        label: 'Investment Calculator',
        icon: 'pi pi-calculator',
        command: () => {
          this.router.navigate(['/calculator']);
        },
      },
      {
        label: 'Favorite Tickers',
        icon: 'pi pi-heart-fill',
        items: this.generateFavoriteTickersMenuItems(),
      },
      {
        label: 'Saved Articles',
        icon: 'pi pi-book',
        command: () => {
          this.toggleSidebar();
        },
      },
    ];
  }

  generateFavoriteTickersMenuItems(): MenuItem[] {
    const favoriteTickers =
      this.favoriteTickersService.favoriteTickersSubject.getValue();

    if (favoriteTickers.length === 0) {
      return [
        {
          label: 'No favorite tickers saved',
          icon: 'pi pi-info-circle',
          disabled: true, // Disables the item so it can't be clicked
        },
      ];
    }

    return favoriteTickers.map((ticker) => ({
      label: ticker,
      command: () => {
        this.router.navigate([`/ticker/${ticker}`]);
      },
      items: [
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.favoriteTickersService.removeTicker(ticker);
            this.updateMenuItems(); // Update the menu after removing a ticker
          },
        },
      ],
    }));
  }

  ngOnDestroy() {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }
}
