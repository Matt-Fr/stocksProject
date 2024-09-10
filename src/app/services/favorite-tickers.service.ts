import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteTickersService {
  favoriteTickers = signal<string[]>([]);

  constructor() {
    const storedTickers = localStorage.getItem('favoriteTickers');
    if (storedTickers) {
      this.favoriteTickers.set(JSON.parse(storedTickers));
    }
    console.log(this.favoriteTickers());
  }

  addTicker(ticker: string) {
    const currentTickers = this.favoriteTickers();
    if (!currentTickers.includes(ticker)) {
      const updatedTickers = [...currentTickers, ticker];
      this.favoriteTickers.set(updatedTickers);
      localStorage.setItem('favoriteTickers', JSON.stringify(updatedTickers));
    }
  }

  removeTicker(ticker: string) {
    const updatedTickers = this.favoriteTickers().filter((t) => t !== ticker);
    this.favoriteTickers.set(updatedTickers);
    localStorage.setItem('favoriteTickers', JSON.stringify(updatedTickers));
  }

  isFavorite(ticker: string): boolean {
    return this.favoriteTickers().includes(ticker);
  }
}
