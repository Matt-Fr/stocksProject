import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FavoriteTickersService } from '../../services/favoriteTickers/favorite-tickers.service';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { SavedArticleService } from '../../services/savedArticles/saved-articles.service';
import { ThumbnailArticleComponent } from '../thumbnail-article/thumbnail-article.component';
import { computed, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, SidebarModule, ThumbnailArticleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private favoriteTickersService = inject(FavoriteTickersService);
  private articleService = inject(SavedArticleService);

  sidebarVisible = signal(false);
  savedArticles = this.articleService.savedArticles;

  // Computed signal for menu items
  menuItems = computed((): MenuItem[] => {
    const favoriteTickers = this.favoriteTickersService.favoriteTickers();
    return [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/']),
      },
      {
        label: 'Investment Calculator',
        icon: 'pi pi-calculator',
        command: () => this.router.navigate(['/calculator']),
      },
      {
        label: 'Favorite Tickers',
        icon: 'pi pi-heart-fill',
        items: favoriteTickers.length
          ? favoriteTickers.map((ticker) => ({
              label: ticker,
              command: () => this.router.navigate([`/ticker/${ticker}`]),
              items: [
                {
                  label: 'Delete',
                  icon: 'pi pi-times',
                  command: () =>
                    this.favoriteTickersService.removeTicker(ticker),
                },
              ],
            }))
          : [
              {
                label: 'No favorite tickers saved',
                icon: 'pi pi-info-circle',
                disabled: true,
              },
            ],
      },
      {
        label: 'Saved Articles',
        icon: 'pi pi-book',
        command: () => this.toggleSidebar(),
      },
    ];
  });

  toggleSidebar() {
    this.sidebarVisible.update((visible) => !visible);
  }

  ngOnInit() {
    // No additional subscriptions or effects needed; `menuItems` will auto-update
  }
}
