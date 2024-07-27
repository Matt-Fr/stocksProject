import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  daata: any = {};
  pic: string = '';

  ngOnInit(): void {
    const ticker = this.route.snapshot.paramMap.get('ticker');

    if (ticker) {
      const subscription = this.httpClient
        .get(
          `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${environment.apiKeyPolygon}`
        )
        .subscribe({
          next: (resData) => {
            console.log(resData);
            this.daata = resData;
            this.pic = this.daata?.results?.branding?.logo_url || '';
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      console.error('Ticker not found in the URL');
    }
  }
}
