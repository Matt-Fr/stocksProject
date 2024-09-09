import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  items: MenuItem[] = [];
  favoriteTickers: string[] = [];

  ngOnInit() {
    // Load favorite tickers from localStorage
    const storedTickers = localStorage.getItem('favoriteTickers');
    if (storedTickers) {
      this.favoriteTickers = JSON.parse(storedTickers);
    }

    // Generate menu items
    this.items = [
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
    ];
  }

  // Generate MenuItems for favorite tickers
  generateFavoriteTickersMenuItems(): MenuItem[] {
    return this.favoriteTickers.map((ticker) => ({
      label: ticker,
      icon: 'pi pi-link', // icon for each ticker
      command: () => {
        this.router.navigate([`/ticker/${ticker}`]); // Navigate to ticker page
      },
      items: [
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.removeTickerFromFavorites(ticker);
          },
        },
      ],
    }));
  }

  // Remove ticker from favorites
  removeTickerFromFavorites(ticker: string) {
    this.favoriteTickers = this.favoriteTickers.filter(
      (favTicker) => favTicker !== ticker
    );
    localStorage.setItem(
      'favoriteTickers',
      JSON.stringify(this.favoriteTickers)
    );

    // Update the menu items to reflect the removal
    this.items = [
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
    ];
  }
}
