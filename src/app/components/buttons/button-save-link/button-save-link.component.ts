import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

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
  checked: boolean = false;
  favoriteTickers: string[] = [];

  ngOnInit() {
    // Check if the ticker is already in localStorage on component initialization
    const storedTickers = localStorage.getItem('favoriteTickers');
    if (storedTickers) {
      this.favoriteTickers = JSON.parse(storedTickers);
      this.checked = this.favoriteTickers.includes(this.text());
    }
  }

  toggleFavorite() {
    // Get the latest favoriteTickers from localStorage
    const storedTickers = localStorage.getItem('favoriteTickers');
    if (storedTickers) {
      this.favoriteTickers = JSON.parse(storedTickers); // Keep previously stored tickers
    }

    const ticker = this.text() || '';

    if (this.checked) {
      // If already checked, remove it from the array
      this.favoriteTickers = this.favoriteTickers.filter(
        (favTicker) => favTicker !== ticker
      );
    } else {
      // If not checked, add it to the array
      this.favoriteTickers.push(ticker);
    }

    // Save the updated favoriteTickers back to localStorage
    localStorage.setItem(
      'favoriteTickers',
      JSON.stringify(this.favoriteTickers)
    );

    // Toggle the checked state
    this.checked = !this.checked;
  }
}
