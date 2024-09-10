import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { FavoriteTickersService } from '../../services/favorite-tickers.service'; // Import the service

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private favoriteTickersService = inject(FavoriteTickersService); // Inject the service
  items = signal<MenuItem[]>([]); // Correct signal type for MenuItem[]

  ngOnInit() {
    // Directly call updateMenuItems whenever component initializes
    this.updateMenuItems();
  }

  updateMenuItems() {
    this.items.set([
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        },
      },
      {
        label: 'investment calculator',
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
    ]);
  }

  generateFavoriteTickersMenuItems(): MenuItem[] {
    return this.favoriteTickersService.favoriteTickers().map((ticker) => ({
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
}
