import { Component, inject, input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FavoriteTickersService } from '../../../services/favoriteTickers/favorite-tickers.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-button-save-link',
  standalone: true,
  imports: [ButtonModule, RouterModule, TooltipModule],
  templateUrl: './button-save-link.component.html',
  styleUrl: './button-save-link.component.css',
})
export class ButtonSaveLinkComponent implements OnInit, OnDestroy {
  text = input<string>('');
  url = input<string>();
  tooltipText = input<string>();
  checked = false; // Simple boolean instead of signal
  favoriteTickersService = inject(FavoriteTickersService); // Inject the service
  private subscription!: Subscription; // Subscription to manage observable

  ngOnInit() {
    // Subscribe to the favoriteTickers$ observable and update the checked state
    this.subscription = this.favoriteTickersService.favoriteTickers$.subscribe(
      (tickers) => {
        this.checked = tickers.includes(this.text());
      }
    );
  }

  toggleFavorite() {
    const ticker = this.text();

    if (this.checked) {
      this.favoriteTickersService.removeTicker(ticker);
    } else {
      this.favoriteTickersService.addTicker(ticker);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }
}
