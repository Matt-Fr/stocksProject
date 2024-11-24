import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteTickersService {
  favoriteTickers = signal<string[]>([]); // Signal to store favorite tickers

  constructor() {
    const storedTickers = localStorage.getItem('favoriteTickers');
    if (storedTickers) {
      this.favoriteTickers.set(JSON.parse(storedTickers));
    }
  }

  addTicker(ticker: string): void {
    const currentTickers = this.favoriteTickers();

    if (!currentTickers.includes(ticker)) {
      const updatedTickers = [...currentTickers, ticker];
      this.favoriteTickers.set(updatedTickers);
      localStorage.setItem('favoriteTickers', JSON.stringify(updatedTickers));
    }
  }

  removeTicker(ticker: string): void {
    const updatedTickers = this.favoriteTickers().filter((t) => t !== ticker);
    this.favoriteTickers.set(updatedTickers);
    localStorage.setItem('favoriteTickers', JSON.stringify(updatedTickers));
  }
}
