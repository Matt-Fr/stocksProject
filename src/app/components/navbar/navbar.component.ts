import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { FavoriteTickersService } from '../../services/favorite-tickers.service';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private favoriteTickersService = inject(FavoriteTickersService); // Inject the service
  items: MenuItem[] = []; // MenuItem array for the menu
  private subscription!: Subscription;

  ngOnInit() {
    // Subscribe to the favoriteTickers$ observable to update menu items
    this.subscription = this.favoriteTickersService.favoriteTickers$.subscribe(
      () => {
        this.updateMenuItems();
      }
    );
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
    ];
  }

  generateFavoriteTickersMenuItems(): MenuItem[] {
    return this.favoriteTickersService.favoriteTickersSubject
      .getValue()
      .map((ticker) => ({
        label: ticker,
        icon: 'pi pi-link',
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
    if (this.subscription) {
      this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }
}
