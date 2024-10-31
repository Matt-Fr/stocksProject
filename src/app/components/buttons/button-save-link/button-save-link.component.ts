import { Component, inject, input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
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
  styleUrl: './button-save-link.component.css',
  providers: [MessageService],
})
export class ButtonSaveLinkComponent implements OnInit, OnDestroy {
  text = input<string>('');
  url = input<string>();
  tooltipText = input<string>();
  checked = false; // Simple boolean instead of signal
  favoriteTickersService = inject(FavoriteTickersService); // Inject the service
  private subscription!: Subscription; // Subscription to manage observable
  messageService = inject(MessageService);

  tickerAddedToast(ticker: string) {
    this.messageService.add({
      severity: 'success',
      detail: `${ticker} added to your favorite tickers`,
      life: 1800,
    });
  }

  tickerRemovedToast(ticker: string) {
    this.messageService.add({
      severity: 'info',
      detail: `${ticker} removed from your favorite tickers `,
      life: 1200,
    });
  }

  ngOnInit() {
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
      this.tickerRemovedToast(ticker);
    } else {
      this.favoriteTickersService.addTicker(ticker);
      this.tickerAddedToast(ticker);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
