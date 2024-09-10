import { Component, inject, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FavoriteTickersService } from '../../../services/favorite-tickers.service';

@Component({
  selector: 'app-button-save-link',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  templateUrl: './button-save-link.component.html',
  styleUrl: './button-save-link.component.css',
})
export class ButtonSaveLinkComponent {
  text = input<string>('');
  url = input<string>();
  favoriteTickersService = inject(FavoriteTickersService); // Inject the service
  checked = signal<boolean>(false); // Use signal for checked state

  ngOnInit() {
    this.checked.set(this.favoriteTickersService.isFavorite(this.text()));
    console.log(this.checked());
    console.log(this.favoriteTickersService.isFavorite(this.text()));
  }

  toggleFavorite() {
    const ticker = this.text();

    if (this.checked()) {
      this.favoriteTickersService.removeTicker(ticker);
    } else {
      this.favoriteTickersService.addTicker(ticker);
    } // Toggle the checked state
    this.checked.set(!this.checked());
  }
}
