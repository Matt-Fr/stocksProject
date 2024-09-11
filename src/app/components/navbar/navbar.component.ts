import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { FavoriteTickersService } from '../../services/favorite-tickers.service';
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
  private subscription!: Subscription;

  sidebarVisible: boolean = false;
  savedArticles = this.articleService.savedArticles(); // Access the saved articles from ArticleService

  ngOnInit() {
    this.subscription = this.favoriteTickersService.favoriteTickers$.subscribe(
      () => {
        this.updateMenuItems();
      }
    );
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
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
      {
        label: 'Toggle Sidebar',
        icon: 'pi pi-bars',
        command: () => {
          this.toggleSidebar();
        },
      },
    ];
  }

  generateFavoriteTickersMenuItems(): MenuItem[] {
    return this.favoriteTickersService.favoriteTickersSubject
      .getValue()
      .map((ticker) => ({
        label: ticker,
        command: () => {
          this.router.navigate([`/${ticker}`]);
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
