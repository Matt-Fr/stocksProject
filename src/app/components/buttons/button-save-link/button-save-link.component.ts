import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FavoriteTickersService } from '../../../services/favoriteTickers/favorite-tickers.service';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-button-save-link',
  standalone: true,
  imports: [ButtonModule, RouterModule, TooltipModule, ToastModule],
  templateUrl: './button-save-link.component.html',
  styleUrls: ['./button-save-link.component.css'],
  providers: [MessageService],
})
export class ButtonSaveLinkComponent {
  text = input<string>(''); // Ticker text input
  url = input<string>(); // URL input
  tooltipText = input<string>(); // Tooltip text input
  favoriteTickersService = inject(FavoriteTickersService); // Inject the service
  messageService = inject(MessageService);
  router = inject(Router);

  // Reactive getter for checked state based on the signal
  get checked(): boolean {
    return this.favoriteTickersService.favoriteTickers().includes(this.text());
  }

  tickerAddedToast(ticker: string): void {
    this.messageService.add({
      severity: 'success',
      detail: `${ticker} added to your favorite tickers`,
      life: 1800,
    });
  }

  tickerRemovedToast(ticker: string): void {
    this.messageService.add({
      severity: 'info',
      detail: `${ticker} removed from your favorite tickers`,
      life: 1200,
    });
  }

  navigateToTicker(): void {
    this.router.navigate(['/ticker', this.url()]);
  }

  toggleFavorite(): void {
    const ticker = this.text();

    if (this.checked) {
      this.favoriteTickersService.removeTicker(ticker);
      this.tickerRemovedToast(ticker);
    } else {
      this.favoriteTickersService.addTicker(ticker);
      this.tickerAddedToast(ticker);
    }
  }
}
