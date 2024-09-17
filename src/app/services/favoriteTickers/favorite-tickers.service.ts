import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteTickersService {
  favoriteTickersSubject = new BehaviorSubject<string[]>([]);
  favoriteTickers$ = this.favoriteTickersSubject.asObservable(); // Expose as observable

  constructor() {
    const storedTickers = localStorage.getItem('favoriteTickers');
    if (storedTickers) {
      this.favoriteTickersSubject.next(JSON.parse(storedTickers));
    }
  }

  addTicker(ticker: string) {
    const currentTickers = this.favoriteTickersSubject.getValue();
    if (!currentTickers.includes(ticker)) {
      const updatedTickers = [...currentTickers, ticker];
      this.favoriteTickersSubject.next(updatedTickers);
      localStorage.setItem('favoriteTickers', JSON.stringify(updatedTickers));
    }
  }

  removeTicker(ticker: string) {
    const updatedTickers = this.favoriteTickersSubject
      .getValue()
      .filter((t) => t !== ticker);
    this.favoriteTickersSubject.next(updatedTickers);
    localStorage.setItem('favoriteTickers', JSON.stringify(updatedTickers));
  }

  isFavorite(ticker: string): boolean {
    return this.favoriteTickersSubject.getValue().includes(ticker);
  }
}
